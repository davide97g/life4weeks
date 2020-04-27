import { Component, OnInit, ViewChild } from '@angular/core';
import { Record } from '@models/record/';
import { MatCalendarCellCssClasses, MatCalendar } from '@angular/material/datepicker';
import { AuthService } from '@services/auth/auth.service';

function checkDate(utc: string, incomplete: Date): boolean {
	let date = new Date(utc).toLocaleDateString();
	return date == incomplete.toLocaleDateString();
}

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.sass'],
})
export class OverviewComponent implements OnInit {
	records: Record[] = [];
	order: string = 'desc';
	startingDate: Date = new Date('04/15/2020');
	dateClass: Function = (d: Date): MatCalendarCellCssClasses => {
		let record = this.records.find((record: Record) => {
			return checkDate(record.date, d);
		});
		let classes: string = '';
		if (checkDate(this.startingDate.toUTCString(), d)) classes += 'startingDate ';
		if (record) classes += record.emotion.text;
		return classes;
	};
	@ViewChild('calendar') calendar: MatCalendar<Date>;
	constructor(private auth: AuthService) {}

	ngOnInit(): void {
		this.auth.records$.subscribe((records: Record[]) => {
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
