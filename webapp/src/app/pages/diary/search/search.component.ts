import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DiaryService } from '@services/diary/diary.service';
import { Record } from '@models/record';
import { Emotion } from '@models/emotion/emotion';
import { EmotionService } from '@services/emotion/emotion.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
	records: Record[];
	emotions: Emotion[];
	filters = ['date', 'emotion', 'notes'];
	filter: string = this.filters[0];
	recordFormGroup: FormGroup;
	constructor(
		private diaryService: DiaryService,
		private emotionService: EmotionService,
		private fb: FormBuilder
	) {}
	ngOnInit(): void {
		// ! not working, it's too late
		this.diaryService.records.subscribe((records: Record[]) => {
			this.records = records;
		});
		this.emotions = this.emotionService.getEmotions();
		this.recordFormGroup = this.fb.group({
			date: [null, [Validators.required]],
			emotion: [null, [Validators.required]],
			notes: null,
		});
	}
	get date() {
		return this.recordFormGroup.get('date');
	}
	get emotion() {
		return this.recordFormGroup.get('emotion');
	}
	get notes() {
		return this.recordFormGroup.get('notes');
	}

	search(): void {
		console.info('search by ' + this.filter);
		console.info(this[this.filter].value);
		// console.info(this.records);
	}
}
