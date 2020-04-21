import { Component, OnInit, ViewChild } from '@angular/core';
import { DiaryService } from '@services/diary/diary.service';
import { Record } from '@models/record/';
import { MatCalendarCellCssClasses, MatCalendar } from '@angular/material/datepicker';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.sass'],
})
export class OverviewComponent implements OnInit {
	records: Record[];
	order: string = 'desc';
	dateClass: Function = (d: Date): MatCalendarCellCssClasses => {
		const date = d.toUTCString();
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
			this.orderNotes();
			if (this.calendar) this.calendar.updateTodaysDate(); // update calendar view
		});
	}

	filterWithNotes(records: Record[]): Record[] {
		return records.filter((record: Record) => (record.notes ? true : false));
	}

	formatDate(date: string): string {
		return new Date(date).toLocaleDateString();
	}

	deleteRecord(record: Record) {
		console.info('delete ', record);
		let i = this.records.findIndex((r: Record) => r.date == record.date);
		this.records.splice(i, 1);
		this.calendar.updateTodaysDate(); // update calendar view
	}

	orderNotes() {
		if (this.order == 'desc')
			this.records = this.records.sort((a: Record, b: Record) =>
				new Date(a.date) < new Date(b.date) ? 1 : -1
			);
		else if (this.order == 'asc')
			this.records = this.records.sort((a: Record, b: Record) =>
				new Date(a.date) > new Date(b.date) ? 1 : -1
			);
	}
}
