import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CoreService {
	user: firebase.User;
	userListener: Subject<firebase.User>;
	constructor() {
		this.user = null;
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
