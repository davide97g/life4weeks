import { Component, OnInit, ViewChild } from '@angular/core';
import { DiaryService } from '@services/diary/diary.service';
import { Record } from '@models/record';
import { MatCalendarCellCssClasses, MatCalendar } from '@angular/material/datepicker';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.sass'],
})
export class OverviewComponent implements OnInit {
	records: Record[];
	dateClass: Function = (d: Date): MatCalendarCellCssClasses => {
		const date = d.toLocaleDateString();
		let record = this.records.find((record: Record) => record.date === date);
		return record ? record.emotion.text : '';
	};
	@ViewChild('calendar') calendar: MatCalendar<Date>;
	constructor(private diaryService: DiaryService) {
		this.records = [];
	}

	ngOnInit(): void {
		this.diaryService.records.subscribe((records: Record[]) => {
			this.records = records;
			this.calendar.updateTodaysDate(); // update calendar view
		});
	}
}
