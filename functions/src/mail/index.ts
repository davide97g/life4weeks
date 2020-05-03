import * as firebase from 'firebase/app';
import 'firebase/firestore';
import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import { User } from '@models/user';

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
			from: 'Life in weeks' + myEmail,
			to: data.email,
			subject: 'Email test ' + data.name,
			text: 'Hi ' + data.name + ", this is an email test and it's working I guess 🚀",
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
		from: 'Life in weeks' + myEmail,
		to: user.email,
		subject: 'Registration',
		html:
			`
			<body>
			<h3>
				Welcome
				<pre style="display: inline;">` +
			user.displayName +
			`</pre>
				😄
			</h3>
			<p style="display: block;">
				This mail is a confirmation of your registration to "Life in weeks". We are very happy that
				you joined the project!
			</p>
			<a style="display: block;" href="https://life-4-weeks.firebaseapp.com">Go to website<a />
		</body>
		`,
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
