import { Injectable } from '@angular/core';
import { Emotion, EmotionList } from '@models/emotion/emotion';

@Injectable({
	providedIn: 'root',
})
export class EmotionService {
	constructor() {}
	getEmotions(): Emotion[] {
		return EmotionList;
	}
}
