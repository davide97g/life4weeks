interface Metadata {
	creationTime: string;
	lastSignInTime: string;
}
export interface User {
	uid: string;
	email: string;
	displayName: string;
	photoURL: string;
	metadata: Metadata;
}
