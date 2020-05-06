import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Record, records } from '@models/record/';
import { Emotion } from '@models/emotion/';
import { UtilsService } from '@services/utils.service';
import { AuthService } from '@services/auth.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
	emotions: Emotion[];
	filters = ['date', 'emotion', 'notes'];
	filter: string = this.filters[0];
	keywords: string[] = [];
	recordFormGroup: FormGroup;
	records: Record[] = [];
	constructor(private utils: UtilsService, private auth: AuthService, private fb: FormBuilder) {}
	ngOnInit(): void {
		this.emotions = this.utils.getEmotions();
		this.recordFormGroup = this.fb.group({
			date: [null, [Validators.required]],
			emotion: [null, [Validators.required]],
			notes: null,
		});
		this.auth.records$.subscribe((records: Record[]) => (this.records = records));
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

	check() {
		if (!this.notes.value) return;
		let splitted_by_spaces: string[] = this.notes.value.split(' ');
		let splitted_by_enters: string[] = this.notes.value.split('\n');
		let keyword: string = null;
		if (splitted_by_spaces.length > 1) keyword = splitted_by_spaces[0].trim();
		if (splitted_by_enters.length > 1) keyword = splitted_by_enters[0].trim();
		if (keyword == '') {
			this.notes.setValue(null);
		} else if (keyword !== null) {
			this.keywords.push(keyword);
			this.notes.setValue(null);
		}
	}

	deleteTag(tag: string) {
		let i: number = this.keywords.findIndex((keyword: string) => keyword == tag);
		this.keywords.splice(i, 1);
	}
}
