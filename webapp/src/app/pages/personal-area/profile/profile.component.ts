import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
	edit: boolean = false;
	avatars: string[] = [
		'boy.png',
		'boy-1.png',
		'boy-10.png',
		'boy-11.png',
		'boy-12.png',
		'boy-13.png',
		'boy-14.png',
		'boy-15.png',
		'boy-16.png',
		'boy-17.png',
		'boy-18.png',
		'boy-19.png',
		'boy-2.png',
		'boy-20.png',
		'boy-21.png',
		'boy-22.png',
		'boy-3.png',
		'boy-4.png',
		'boy-5.png',
		'boy-6.png',
		'boy-7.png',
		'boy-8.png',
		'boy-9.png',
		'girl.png',
		'girl-1.png',
		'girl-10.png',
		'girl-11.png',
		'girl-12.png',
		'girl-13.png',
		'girl-14.png',
		'girl-15.png',
		'girl-16.png',
		'girl-17.png',
		'girl-18.png',
		'girl-19.png',
		'girl-2.png',
		'girl-20.png',
		'girl-21.png',
		'girl-22.png',
		'girl-23.png',
		'girl-24.png',
		'girl-25.png',
		'girl-26.png',
		'girl-3.png',
		'girl-4.png',
		'girl-5.png',
		'girl-6.png',
		'girl-7.png',
		'girl-8.png',
		'girl-9.png',
	];
	profilePic: string = this.avatars[3];
	constructor(public auth: AuthService) {}

	ngOnInit(): void {}
}
