import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebaseui from 'firebaseui';
import { Record } from '@models/record';
import { mocked } from '@models/user';
import { Settings } from '@models/settings';
const config = {
	signInSuccessUrl: 'home',
	signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID, auth.EmailAuthProvider.PROVIDER_ID],
	tosUrl: 'terms-of-service',
	privacyPolicyUrl: 'privacy-policy',
};

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	user$: Observable<User>;
	ui: firebaseui.auth.AuthUI = new firebaseui.auth.AuthUI(auth());
	asyncOperation: Subject<boolean> = new Subject<boolean>();
	records: Record[] = null; // local copy
	records$: Subject<Record[]> = new Subject<Record[]>();

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router
	) {
		console.info('auth');
		// ? every time data is shared between component also the service has to listen
		this.records$.subscribe((records: Record[]) => (this.records = records));
		// Get the auth state, then fetch the Firestore user document or return null
		this.getUser();
	}

	async getUser() {
		this.user$ = this.afAuth.authState.pipe(
			switchMap(user => {
				this.asyncOperation.next(false);
				// Logged in
				if (user) {
					return of(user as User);
				} else {
					// Logged out
					return of(null);
				}
			})
		);
	}

	/**
	 * Need to save a local copy of the records
	 */
	public async readRecords(user: User) {
		console.info('readRecords');
		user = mocked; // ! remove this line when real data
		this.asyncOperation.next(true);
		let res = await this.afs
			.collection('users')
			.doc(user.uid)
			.collection('records')
			.get()
			.toPromise()
			.then(snapshot => {
				let values: Record[] = [];
				snapshot.forEach(doc => values.push(doc.data() as Record));
				return values;
			})
			.catch(err => {
				console.error(err);
				return [];
			});
		this.asyncOperation.next(false);
		this.records$.next(res); // send to subscribers
	}

	async newRecord(user: User, record: Record): Promise<boolean> {
		this.asyncOperation.next(true);
		let res: boolean = await this.afs
			.collection('users')
			.doc(user.uid)
			.collection('records')
			.add(record)
			.then(() => true)
			.catch(err => {
				console.error(err);
				return false;
			});
		this.asyncOperation.next(false);
		return res;
	}

	async deleteRecord(user: User, record: Record): Promise<boolean> {
		this.asyncOperation.next(true);
		let res: boolean = false;
		// records reference
		let recordsRef = this.afs.collection('users').doc(user.uid).collection('records').ref;
		// prepare query
		let query = recordsRef.where('date', '==', record.date);
		// find doc id with date == record.date
		let id: string = await query
			.get()
			.then(found => {
				if (!found) return null;
				else {
					if (found.docs.length > 1)
						console.warn('more than one records found with date: ', record.date);
					return found.docs[0].id; // me fido
				}
			})
			.catch(err => {
				console.error(err);
				return null;
			});
		if (id)
			// delete that doc
			res = await recordsRef
				.doc(id)
				.delete()
				.then(() => true) // unica possibilità di diventare "true"
				.catch(err => {
					console.error(err);
					return false;
				});
		this.asyncOperation.next(false);
		return res;
	}

	/**
	 * @name getUserSettings
	 * @description download the user's settings and returns a promise
	 * @returns {Promise<Settings>}
	 */
	async getUserSettings(): Promise<Settings> {
		this.asyncOperation.next(true);
		let user: User = mocked; // todo_ remove this and use the user from auth
		let userRef = this.afs.collection('users').doc(user.uid).ref;
		let res: Settings = await userRef
			.get()
			.then(snapshot => (snapshot && snapshot.data() ? (snapshot.data() as Settings) : null))
			.catch(err => {
				console.error(err);
				return null;
			});
		this.asyncOperation.next(false);
		return res;
	}

	async saveUserSettings(settings: Settings): Promise<boolean> {
		this.asyncOperation.next(true);
		let res: boolean = false;
		let user: User = mocked;
		let userRef = this.afs.collection('users').doc(user.uid).ref;
		res = await userRef
			.set(settings, { merge: true })
			.then(() => true)
			.catch(err => {
				console.error(err);
				return false;
			});
		this.asyncOperation.next(false);
		return res;
	}

	// TODO use this function on login
	private updateUserData(user: User) {
		// Sets user data to firestore on login
		// ! modify this line to point on the correct location
		const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

		const data = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			metadata: user.metadata,
		};

		return userRef.set(data, { merge: true });
	}

	async signOut() {
		await this.afAuth.signOut();
		this.router.navigate(['/']);
	}

	startUi() {
		this.ui.start('#firebaseui-auth-container', config);
	}
}
