import { Component, OnInit } from '@angular/core';
import { Emotion } from '@models/emotion';
import { UtilsService } from '@services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEmotionColorComponent } from '@components/dialog-emotion-color/dialog-emotion-color.component';
import { AuthService } from '@services/auth.service';
import { Settings, defaultSettings } from '@models/settings';
import { Theme, themes } from '@models/theme';
@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass', '../../../../../../models/src/emotion/style.sass'],
})
export class SettingsComponent implements OnInit {
	defaultSettings: Settings = defaultSettings;
	settings: Settings = this.defaultSettings;
	themes: Theme[] = themes;
	constructor(public utils: UtilsService, private dialog: MatDialog, private auth: AuthService) {}

	ngOnInit(): void {
		this.auth
			.getUserSettings()
			.then((settings: Settings) => {
				if (settings) {
					// todo: fix this
					console.info(this.settings.theme, settings.theme);
					if (settings.theme === this.settings.theme) console.info('equal');
				} else settings = defaultSettings;
			})
			.catch(err => console.error(err));
	}

	saveSettings() {
		this.auth
			.saveUserSettings(this.settings)
			.then((res: boolean) =>
				res
					? this.utils.openSnackBar('Settings saved', '👍')
					: this.utils.openSnackBar('Error while saving settings', 'Please try again 🙏')
			)
			.catch(err => {
				console.error(err);
				this.utils.openSnackBar('Something went wrong', '💀💀💀');
			});
	}

	resetSettings() {
		this.settings = this.defaultSettings;
		this.auth
			.saveUserSettings(this.defaultSettings)
			.then((res: boolean) =>
				res
					? this.utils.openSnackBar('Settings resetted', '👍')
					: this.utils.openSnackBar(
							'Error while resetting settings',
							'Please try again 🙏'
					  )
			)
			.catch(err => {
				console.error(err);
				this.utils.openSnackBar('Something went wrong', '💀💀💀');
			});
	}

	openDialog(emotion: Emotion): void {
		console.info(emotion);
		const dialogRef = this.dialog.open(DialogEmotionColorComponent, {
			width: '300px',
			data: emotion,
		});

		dialogRef.afterClosed().subscribe(result => {
			// console.log('The dialog was closed');
			if (result) console.info('dialog', result);
		});
	}
}
