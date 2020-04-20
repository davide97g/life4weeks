import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Record } from '@models/record';

@Injectable({
	providedIn: 'root',
})
export class DiaryService {
	records: Subject<Record[]>;
	constructor() {
		this.records = new Subject<Record[]>();
	}
}
