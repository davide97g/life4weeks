import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Emotion, EmotionList } from '@models/emotion';

@Injectable({
	providedIn: 'root',
})
export class UtilsService {
	constructor(private _snackBar: MatSnackBar) {}
	openSnackBar(message: string, action: string, duration?: number) {
		this._snackBar.open(message, action, {
			duration: duration ? duration : 2000,
		});
	}
	getEmotions(): Emotion[] {
		return EmotionList;
	}
}
