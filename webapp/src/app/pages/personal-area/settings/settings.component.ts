import { Component, OnInit } from '@angular/core';
import { Record } from '@models/record';
import { records } from '@models/test-records';
import { EmotionList, Emotion } from '@models/emotion/';
import { UtilsService } from '@services/utils/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEmotionColorComponent } from '@components/dialog-emotion-color/dialog-emotion-color.component';
@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass', '../../../../../../models/emotion/emotion.sass'],
})
export class SettingsComponent implements OnInit {
	records: Record[] = records;
	emotions: Emotion[] = EmotionList;
	theme: Emotion = this.emotions[1];
	constructor(public utils: UtilsService, private dialog: MatDialog) {}

	ngOnInit(): void {}

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
