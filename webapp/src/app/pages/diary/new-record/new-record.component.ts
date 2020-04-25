import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
	AbstractControl,
	ValidatorFn,
} from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Emotion } from '@models/emotion/';
import { Record, records } from '@models/record/';
import { EmotionService } from '@services/emotion/emotion.service';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { DiaryService } from '@services/diary/diary.service';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const forbidden = nameRe.test(control.value);
		return forbidden ? { forbiddenName: { value: control.value } } : null;
	};
}

@Component({
	selector: 'app-new-record',
	templateUrl: './new-record.component.html',
	styleUrls: ['./new-record.component.sass', '../../../../../../models/src/emotion/style.sass'],
	encapsulation: ViewEncapsulation.None,
})
export class NewRecordComponent implements OnInit {
	records: Record[] = records;
	emotions: Emotion[];
	minDate: Date;
	maxDate: Date;
	recordFormGroup: FormGroup;
	percentage: number;
	spinnerMode: string = 'determinate';
	dateClass: Function = (d: Date): MatCalendarCellCssClasses => {
		const date = d.toUTCString();
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
		this.diaryService.records.next(this.records);
		this.recordFormGroup.valueChanges.subscribe((record: Record) => {
			this.percentage = 0;
			if (record.date) this.percentage += 33;
			if (record.emotion) this.percentage += 34;
			if (record.notes) this.percentage += 33;
		});
		// let testRecord: Record = {
		// 	date: 'Thu, 16 Apr 2020 22:00:00 GMT',
		// 	emotion: { text: 'happy', emoji: '😄', color: '#95fc95' },
		// 	notes: 'weila',
		// };
		// this.findDate(testRecord);
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
		console.info('findDate');
		if (!record || !record.date) return;
		record.date = new Date(record.date).toUTCString();
		let x: Record = this.records.find((r: Record) => r.date === record.date);
		if (x) {
			// console.info('found', x);
			// found
			this.recordFormGroup.setValue(
				{ date: x.date, emotion: x.emotion, notes: x.notes },
				{ emitEvent: false }
			);
			console.info(this.recordFormGroup);
		}
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
			).toUTCString();
			console.info(this.recordFormGroup.value);
			this.records.push(this.recordFormGroup.value);
			this.diaryService.records.next(this.records);
			this.recordFormGroup.reset();
			this.stepper.reset();
			this.spinnerMode = 'determinate';
		}, 2000);
	}
}
