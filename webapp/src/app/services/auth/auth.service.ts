import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebaseui from 'firebaseui';
import { Record } from '@models/record';
import { mocked } from '@models/user';
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
	records: Record[] = [];
	records$: Subject<Record[]> = new Subject<Record[]>();
	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router
	) {
		// Get the auth state, then fetch the Firestore user document or return null
		this.user$ = this.afAuth.authState.pipe(
			switchMap(user => {
				this.asyncOperation.next(false);
				// Logged in
				if (user) {
					this.readRecords(mocked); // TODO da aggiornare con "user as User"
					return of(user as User);
				} else {
					// Logged out
					return of(null);
				}
			})
		);
	}

	/**
	 * devo salvarmi una copia locale e poi inviarla alle pagine che potrebbero essere in ascolto
	 */
	async readRecords(user: User): Promise<Record[]> {
		console.info('readRecords');
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
		this.records$.next(res); // qui devo prima salvarmi la copia locale
		return res;
	}

	async newRecord(user: User, record: Record): Promise<boolean> {
		this.asyncOperation.next(true);
		let res = await this.afs
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

	async readFromDatabase() {
		this.asyncOperation.next(true);
		let random: number = Math.random() * 2000;
		console.info('readFromDatabase: ' + Math.round(random / 2) / 1000 + ' seconds');
		setTimeout(() => this.asyncOperation.next(false), random);
	}

	// async googleSignin() {
	// 	const provider = new auth.GoogleAuthProvider();
	// 	const credential = await this.afAuth.signInWithPopup(provider);
	// 	return this.updateUserData(credential.user);
	// }

	// private updateUserData(user) {
	// 	// Sets user data to firestore on login
	// 	const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

	// 	const data = {
	// 		uid: user.uid,
	// 		email: user.email,
	// 		displayName: user.displayName,
	// 		photoURL: user.photoURL,
	// 	};

	// 	return userRef.set(data, { merge: true });
	// }

	async signOut() {
		await this.afAuth.signOut();
		this.router.navigate(['/']);
	}

	startUi() {
		this.ui.start('#firebaseui-auth-container', config);
	}
}
