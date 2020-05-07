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

import { AngularFireStorage } from '@angular/fire/storage';

import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebaseui from 'firebaseui';
import { Record } from '@models/record';
import { Settings } from '@models/settings';
import { Avatar } from '@models/avatar';

// configuration for the ui
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
	user$: Observable<User>; // user observable
	user: User;
	settings: Settings;
	settings$: Subject<Settings> = new Subject<Settings>();
	ui: firebaseui.auth.AuthUI = new firebaseui.auth.AuthUI(auth()); // login firebase ui
	asyncOperation: Subject<boolean> = new Subject<boolean>(); // signal to the progress bar
	records: Record[] = null; // records local copy
	records$: Subject<Record[]> = new Subject<Record[]>(); // records observable

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private afstr: AngularFireStorage,
		private router: Router
	) {
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
					this.user = user as User;
					return of(this.user);
				} else {
					// Logged out
					return of(null);
				}
			})
		);
	}

	getUserInfo(): User {
		return this.user;
	}

	public async readRecords() {
		console.info('📘 - read');
		this.asyncOperation.next(true);
		let res = await this.afs
			.collection('users')
			.doc(this.user.uid)
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

	async newRecord(record: Record): Promise<boolean> {
		this.asyncOperation.next(true);
		console.info('📗 - write');
		let res: boolean = await this.afs
			.collection('users')
			.doc(this.user.uid)
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

	async deleteRecord(record: Record): Promise<boolean> {
		this.asyncOperation.next(true);
		console.info('📘 - read');
		let res: boolean = false;
		// records reference
		let recordsRef = this.afs.collection('users').doc(this.user.uid).collection('records').ref;
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
		if (id) {
			console.info('📕 - delete');
			// delete that doc
			res = await recordsRef
				.doc(id)
				.delete()
				.then(() => true) // unica possibilità di diventare "true"
				.catch(err => {
					console.error(err);
					return false;
				});
		}
		this.asyncOperation.next(false);
		return res;
	}

	getUserSettings(): Settings {
		return this.settings;
	}

	/**
	 * @name getUserSettings
	 * @description download the user's settings and returns a promise
	 * @returns {Promise<Settings>}
	 */
	async readUserSettings(): Promise<Settings> {
		this.asyncOperation.next(true);
		console.info('📘 - read');
		let userRef = this.afs.collection('users').doc(this.user.uid).ref;
		let res: Settings = await userRef
			.get()
			.then(snapshot => (snapshot && snapshot.data() ? (snapshot.data() as Settings) : null))
			.catch(err => {
				console.error(err);
				return null;
			});
		this.settings = res;
		this.asyncOperation.next(false);
		return res;
	}

	async saveUserSettings(settings: Settings): Promise<boolean> {
		this.asyncOperation.next(true);
		console.info('📗 - write');
		let res: boolean = false;
		let userRef = this.afs.collection('users').doc(this.user.uid).ref;
		res = await userRef
			.set(settings, { merge: true })
			.then(() => true)
			.catch(err => {
				console.error(err);
				return false;
			});
		if (res) this.settings = settings;
		this.asyncOperation.next(false);
		this.settings$.next(this.settings);
		return res;
	}

	/**
	 * firebase storage
	 */

	async getAvatars(): Promise<Avatar[]> {
		let links: Avatar[] = [];
		// Create a reference under which you want to list
		var listRef = this.afstr.ref('avatars/');
		// Find all the prefixes and items.
		let itemRefs = await listRef
			.listAll()
			.toPromise()
			.then(res => res.items);
		let promises = [];
		itemRefs.forEach(itemRef => {
			// All the items under listRef.
			promises.push(
				itemRef
					.getDownloadURL()
					.then(url => links.push({ url: url, fullPath: itemRef.fullPath }))
			);
		});
		await Promise.all(promises);
		return links;
	}

	async signOut() {
		await this.afAuth.signOut();
		this.router.navigate(['/']);
	}

	startUi() {
		this.ui.start('#firebaseui-auth-container', config);
	}
}
