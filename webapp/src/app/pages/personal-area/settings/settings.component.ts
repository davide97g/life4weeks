import { Component, OnInit } from '@angular/core';
import { Emotion } from '@models/emotion';
import { UtilsService } from '@services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEmotionColorComponent } from '@components/dialog-emotion-color/dialog-emotion-color.component';
import { AuthService } from '@services/auth.service';
// import { Record } from '@models/record';
import { Settings } from '@models/settings';
import { Theme, themes } from '@models/theme';
@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass', '../../../../../../models/src/emotion/style.sass'],
})
export class SettingsComponent implements OnInit {
	// records: Record[] = [];
	settings: Settings = null;
	themes: Theme[] = themes;
	theme: Theme;
	constructor(public utils: UtilsService, private dialog: MatDialog, private auth: AuthService) {}

	ngOnInit(): void {
		// this.auth.records$.subscribe((records: Record[]) => (this.records = records));
		this.auth.getUserSettings().then((settings: Settings) => {
			this.settings = settings;
			this.check();
		});
	}

	check() {
		this.theme = this.settings.theme;
		console.info('check', this.theme, this.settings.theme);
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
