import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { UtilsService } from '@services/utils.service';
import { Settings } from '@models/settings';
import { Avatar } from '@models/avatar';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
	edit: boolean = false;
	avatars: Avatar[] = [];
	profilePic: Avatar;
	settings: Settings;
	constructor(public auth: AuthService, public utils: UtilsService) {}

	ngOnInit(): void {
		this.auth.settings$.subscribe((settings: Settings) => {
			this.settings = settings;
			console.info(this.settings.avatar);
			this.auth.getAvatars().then((avatars: Avatar[]) => {
				this.avatars = avatars;
				this.profilePic = this.avatars.find(
					(avatar: Avatar) => avatar.fullPath == this.settings.avatar
				);
			});
		});
	}

	save() {
		this.edit = false;
		this.settings.avatar = this.profilePic.fullPath;
		this.auth.settings$.next(this.settings);
		this.auth
			.saveUserSettings(this.settings)
			.then((res: boolean) =>
				res
					? this.utils.openSnackBar('Profile pic saved', '👍')
					: this.utils.openSnackBar(
							'Error while saving profile pic',
							'Please try again 🙏'
					  )
			)
			.catch(err => {
				console.error(err);
				this.utils.openSnackBar('Something went wrong', '💀💀💀');
			});
	}
}
