import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

import * as firebaseConfig from '@config/firebase.config.json';
const config = (firebaseConfig as any).default;
import * as firebaseUiConfig from '@config/firebaseui.config.json';
import { Subject } from 'rxjs';
const uiConfig = (firebaseUiConfig as any).default;

uiConfig.signInOptions = [
	firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	firebase.auth.EmailAuthProvider.PROVIDER_ID,
];

@Injectable({
	providedIn: 'root',
})
export class CoreService {
	ui: firebaseui.auth.AuthUI;
	user: firebase.User;
	userListener: Subject<firebase.User>;
	constructor() {
		firebase.initializeApp(config);
		this.ui = new firebaseui.auth.AuthUI(firebase.auth());
		this.user = null;
	}

	startUi() {
		this.ui.start('#firebaseui-auth-container', uiConfig);
	}

	getUser() {
		return this.user;
	}

	auth() {
		return firebase.auth();
	}

	firestore() {
		return firebase.firestore();
	}
}
