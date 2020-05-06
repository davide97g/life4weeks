import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Record } from '@models/record/';
import { mocked } from '@models/user';
import { MatCalendarCellCssClasses, MatCalendar } from '@angular/material/datepicker';
import { DiaryService } from '@services/diary/diary.service';
import { AuthService } from '@services/auth/auth.service';
import { UtilsService } from '@services/utils/utils.service';

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
	order: string = 'desc';
	startingDate: Date = new Date('04/15/2020');
	dateClass: Function = (d: Date): MatCalendarCellCssClasses => {
		if (!this.records) return;
		let record = this.records.find((record: Record) => {
			return checkDate(record.date, d);
		});
		let classes: string = '';
		if (checkDate(this.startingDate.toUTCString(), d)) classes += 'startingDate ';
		if (record) classes += record.emotion.text;
		return classes;
	};
	@ViewChild('calendar') calendar: MatCalendar<Date>;
	records: Record[];
	constructor(
		private diaryService: DiaryService,
		private auth: AuthService,
		private utils: UtilsService
	) {}
	ngOnInit(): void {
		this.diaryService.records.subscribe((records: Record[]) => {
			this.records = records;
			this.orderNotes();
			if (this.calendar) this.calendar.updateTodaysDate(); // update calendar view
		});
	}

	filterWithNotes(records: Record[]): Record[] {
		return records ? records.filter((record: Record) => (record.notes ? true : false)) : [];
	}

	formatDate(date: string): string {
		return new Date(date).toLocaleDateString();
	}

	deleteRecord(record: Record) {
		console.info('delete', record);
		let i = this.records.findIndex((r: Record) => r.date == record.date);
		if (i !== -1)
			// if found
			this.auth
				.deleteRecord(mocked, record)
				.then((res: boolean) => {
					if (res) {
						this.utils.openSnackBar('Record on date ' + record.date, 'Deleted');
						this.records.splice(i, 1); // delete from the local copy
						this.diaryService.records.next(this.records); // send update
						this.calendar.updateTodaysDate(); // update calendar view
					} else
						this.utils.openSnackBar(
							'Error while inserting new Record',
							'Please try again 🙏'
						);
				})
				.catch(err => {
					console.error(err);
					this.utils.openSnackBar('Something went wrong', '💀💀💀');
				});
		else console.error('Invalid index');
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
