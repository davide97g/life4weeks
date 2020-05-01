import { Component, OnInit } from '@angular/core';
import { EmotionList, Emotion } from '@models/emotion';
import { UtilsService } from '@services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEmotionColorComponent } from '@components/dialog-emotion-color/dialog-emotion-color.component';
import { AuthService } from '@services/auth.service';
import { Record } from '@models/record';
@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass', '../../../../../../models/src/emotion/style.sass'],
})
export class SettingsComponent implements OnInit {
	emotions: Emotion[] = EmotionList;
	theme: Emotion = this.emotions[1];
	records: Record[] = [];
	constructor(public utils: UtilsService, private dialog: MatDialog, private auth: AuthService) {}

	ngOnInit(): void {
		this.auth.records$.subscribe((records: Record[]) => (this.records = records));
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
