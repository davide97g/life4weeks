import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user/user.model';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebaseui from 'firebaseui';
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

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router
	) {
		// Get the auth state, then fetch the Firestore user document or return null
		this.user$ = this.afAuth.authState.pipe(
			switchMap(user => {
				// Logged in
				if (user) {
					// return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
					return of(user as User);
				} else {
					// Logged out
					return of(null);
				}
			})
		);
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
