import * as firebase from 'firebase/app';
import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import { User } from '../models/src/user';

const myEmail = 'life4weeks@gmail.com';
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: myEmail,
		pass: 'totheisland97$',
	},
});

export const sendMail = functions.https.onCall(
	(data: { name: string; email: string }, context?: functions.https.CallableContext) => {
		const mailOptions = {
			from: 'Life in weeks 😀' + myEmail,
			to: data.email,
			subject: 'Hey there ' + data.name,
			text: 'Welcome ' + data.name + '! 🚀',
		};

		transporter.sendMail(mailOptions, (err: any, info: any) => {
			if (err) {
				console.log('Error', err);
				throw err;
			} else {
				console.info('Email sent', info);
				return info;
			}
		});
	}
);

export const welcomeMail = functions.auth.user().onCreate((u: functions.auth.UserRecord) => {
	const user: User = {
		uid: u.uid,
		email: u.email ? u.email : '',
		displayName: u.displayName ? u.displayName : '',
		photoURL: u.photoURL ? u.photoURL : '',
		metadata: u.metadata,
	};
	const mailOptions = {
		from: 'Zeus Code 😀' + myEmail,
		to: user.email,
		subject: 'Registration to Zeuscode.it',
		text: 'Welcome ' + user.displayName + '! 🚀',
		html: `<h3>Welcome ` + user.displayName + ` 🚀</h3>`,
	};

	transporter.sendMail(mailOptions, (err: any, info: any) => {
		if (err) {
			console.log('Error', err);
			throw err;
		} else {
			console.info('Email sent', info);
			return info;
		}
	});

	// write new user to database
	firebase
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set(user)
		.then(() => console.info('Inserted new user'))
		.catch(err => console.info(err));
});
