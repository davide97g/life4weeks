import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Emotion } from '@models/emotion/emotion';

@Component({
	selector: 'app-dialog-emotion-color',
	templateUrl: './dialog-emotion-color.component.html',
	styleUrls: ['./dialog-emotion-color.component.sass'],
})
export class DialogEmotionColorComponent implements OnInit {
	original: string;
	constructor(
		public dialogRef: MatDialogRef<DialogEmotionColorComponent>,
		@Inject(MAT_DIALOG_DATA) public emotion: Emotion
	) {
		this.original = emotion.color;
	}

	ngOnInit(): void {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
