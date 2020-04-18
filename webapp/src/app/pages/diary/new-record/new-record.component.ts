import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Emotion } from '@models/emotion/emotion';
import { Record } from '@models/record';
import { EmotionService } from '@services/emotion/emotion.service';

@Component({
	selector: 'app-new-record',
	templateUrl: './new-record.component.html',
	styleUrls: ['./new-record.component.sass', '../../../../../../models/emotion/emotion.sass'],
	encapsulation: ViewEncapsulation.None,
})
export class NewRecordComponent implements OnInit {
	records: Record[] = [];
	emotions: Emotion[];
	minDate: Date;
	maxDate: Date;
	recordFormGroup: FormGroup;
	dateClass: Function = (d: Date): MatCalendarCellCssClasses => {
		const date = d.toLocaleDateString();
		let record = this.records.find((record: Record) => record.date === date);
		return record ? record.emotion.text : '';
	};
	constructor(private fb: FormBuilder, private emotionService: EmotionService) {
		this.maxDate = new Date();
		this.emotions = this.emotionService.getEmotions();
	}

	ngOnInit(): void {
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

	findDate(record: Record) {
		// console.info('findDate');
		// if (!record || !record.date) return;
		// let date = new Date(record.date).toLocaleDateString();
		// // console.info('input date', date);
		// // console.table(this.records, 'date');
		// this.records.forEach((r: Record) => {
		// 	if (r.date === date) {
		// 		console.info('record da inserire', r);
		// 		console.info('found', this.recordFormGroup.value);
		// 		this.recordFormGroup = this.fb.group({
		// 			date: r.date,
		// 			emotion: r.emotion,
		// 			notes: r.notes,
		// 		});
		// 	}
		// });
	}

	newRecord() {
		this.recordFormGroup.value.date = new Date(
			this.recordFormGroup.value.date
		).toLocaleDateString();
		console.info(this.recordFormGroup.value);
		this.records.push(this.recordFormGroup.value);
	}
}
