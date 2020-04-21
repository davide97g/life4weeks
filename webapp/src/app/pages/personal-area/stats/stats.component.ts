import { Component, OnInit } from '@angular/core';
import { Record, records } from '@models/record';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoComponent, InfoData } from '@components/dialog-info/dialog-info.component';

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.sass'],
})
export class StatsComponent implements OnInit {
	records: Record[] = records;
	startingDate: Date; // ? read from database
	totalDays: number; // ? difference (in days) between starting date and current date
	percentage: number; // ? #records / totalDays
	infoData: InfoData = {
		title: 'Our statistics',
		messages: [
			'Starting date : the first time you logged',
			'Total days : the number of days since you became a member',
			'Days recorded : how many days recorded of the total since you registered, in percentage',
		],
	};
	constructor(public auth: AuthService, public router: Router, private dialog: MatDialog) {
		this.auth.user$.subscribe(user => {
			this.startingDate = new Date(user.metadata.creationTime);
			this.totalDays = Math.floor(
				(new Date().getTime() - this.startingDate.getTime()) / (1000 * 3600 * 24)
			);
			let recordsSinceStartingDate: Record[] = this.records.filter((record: Record) => {
				return new Date(record.date) > this.startingDate;
			});
			this.percentage = Math.round((recordsSinceStartingDate.length / this.totalDays) * 100); // ! bad --> should take into consideration "date" for the records
		});
	}

	ngOnInit(): void {}
	openDialog(): void {
		this.dialog.open(DialogInfoComponent, {
			width: '350px',
			data: this.infoData,
		});
	}
}
