import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Emotion } from '@models/emotion/emotion';
import { Record } from '@models/record';
import { EmotionService } from '@services/emotion/emotion.service';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { DiaryService } from '@services/diary/diary.service';

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
	percentage: number;
	spinnerMode: string = 'determinate';
	dateClass: Function = (d: Date): MatCalendarCellCssClasses => {
		const date = d.toLocaleDateString();
		let record = this.records.find((record: Record) => record.date === date);
		return record ? record.emotion.text : '';
	};
	@ViewChild('stepper') stepper: MatHorizontalStepper;
	constructor(
		private fb: FormBuilder,
		private emotionService: EmotionService,
		private diaryService: DiaryService
	) {
		this.maxDate = new Date();
		this.emotions = this.emotionService.getEmotions();
	}

	ngOnInit(): void {
		this.recordFormGroup = this.fb.group({
			date: [null, [Validators.required]],
			emotion: [null, [Validators.required]],
			notes: null,
		});
		this.recordFormGroup.valueChanges.subscribe((record: Record) => {
			this.percentage = 0;
			if (record.date) this.percentage += 33;
			if (record.emotion) this.percentage += 34;
			if (record.notes) this.percentage += 33;
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

	/**
	 * @description ricerca se la data che si è scelta è già parte di un record
	 * e in quel caso carica le informazioni precedenti, per sovrascriverle
	 * @param record record in inserimento
	 */
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

	/**
	 * @description inserisce il nuovo record nel database
	 */
	newRecord() {
		this.spinnerMode = 'indeterminate';
		// ? da sostituire con la chiamata al database in scrittura
		setTimeout(() => {
			this.recordFormGroup.value.date = new Date(
				this.recordFormGroup.value.date
			).toLocaleDateString();
			console.info(this.recordFormGroup.value);
			this.records.push(this.recordFormGroup.value);
			this.diaryService.records.next(this.records);
			this.recordFormGroup.reset();
			this.stepper.reset();
			this.spinnerMode = 'determinate';
		}, 2000);
	}
}
