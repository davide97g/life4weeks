import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

interface Emotion {
	value: string;
	emoji: string;
}
interface Record {
	date: string;
	emotion: Emotion;
	notes: string;
}

@Component({
	selector: 'app-diary',
	templateUrl: './diary.component.html',
	styleUrls: ['./diary.component.sass'],
	encapsulation: ViewEncapsulation.None,
})
export class DiaryComponent implements OnInit {
	records: Record[] = [
		// {
		// 	emotion: { value: 'angry', emoji: 'Angry 😠' },
		// 	date: '16/4/2020',
		// 	notes: 'Ti ammazzo',
		// },
		// {
		// 	emotion: { value: 'happy', emoji: 'Happy 😄' },
		// 	date: '18/4/2020',
		// 	notes: 'Evviva',
		// },
		// {
		// 	emotion: { value: 'relaxed', emoji: 'Relaxed 😌' },
		// 	date: '17/4/2020',
		// 	notes: 'Fiuuu',
		// },
		// {
		// 	emotion: { value: 'sad', emoji: 'Sad 😥' },
		// 	date: '20/4/2020',
		// 	notes: 'Sigh...',
		// },
		// {
		// 	emotion: { value: 'energetic', emoji: 'Energetic 😎' },
		// 	date: '25/4/2020',
		// 	notes: 'Yeah 💪',
		// },
	];
	record: Record;
	minDate: Date;
	maxDate: Date;
	isLinear = false;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	emotionsControl = new FormControl();
	dateClass = (d: Date): MatCalendarCellCssClasses => {
		const date = d.toLocaleDateString();
		let css: string = '';
		this.records.forEach((record: Record) => {
			if (date == record.date) css = record.emotion.value;
		});
		return css;
	};
	emotions: Emotion[] = [
		{ value: 'angry', emoji: 'Angry 😠' },
		{ value: 'happy', emoji: 'Happy 😄' },
		{ value: 'relaxed', emoji: 'Relaxed 😌' },
		{ value: 'energetic', emoji: 'Energetic 😎' },
		{ value: 'sad', emoji: 'Sad 😥' },
	];
	constructor(private _formBuilder: FormBuilder) {
		this.maxDate = new Date();
	}

	ngOnInit(): void {
		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['', Validators.required],
		});
		this.secondFormGroup = this._formBuilder.group({
			secondCtrl: ['', Validators.required],
		});
		this.record = {
			date: null,
			emotion: null,
			notes: null,
		};
	}

	findDate(d: string) {
		let date = new Date(d).toLocaleDateString();
		this.records.forEach((record: Record) => {
			if (record.date === date) {
				this.record.emotion = record.emotion;
				this.record.notes = record.notes;
			}
		});
	}

	newRecord() {
		this.record.date = new Date(this.record.date).toLocaleDateString();
		this.records.push(this.record);
		this.clean();
	}

	clean() {
		this.record = {
			date: null,
			emotion: null,
			notes: null,
		};
	}
}
