import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
	selector: 'app-diary',
	templateUrl: './diary.component.html',
	styleUrls: ['./diary.component.sass'],
})
export class DiaryComponent implements OnInit {
	minDate: Date;
	maxDate: Date;
	isLinear = false;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	constructor(private _formBuilder: FormBuilder) {
		const today = new Date();
		this.minDate = today;
		this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getUTCDate() + 5);
	}

	ngOnInit(): void {
		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['', Validators.required],
		});
		this.secondFormGroup = this._formBuilder.group({
			secondCtrl: ['', Validators.required],
		});
	}
}
