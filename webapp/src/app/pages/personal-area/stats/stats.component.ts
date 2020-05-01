import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Record, records } from '@models/record';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoComponent, InfoData } from '@components/dialog-info/dialog-info.component';
import { Chart } from 'chart.js';
import { Emotion, EmotionList } from '@models/emotion';
import { User } from '@models/user';

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.sass'],
})
export class StatsComponent implements OnInit, AfterViewInit {
	records: Record[] = [];
	user: User;
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
	emotions: Emotion[] = EmotionList;
	@ViewChild('polarArea') polarArea: ElementRef;
	graphTypes: string[] = ['doughnut', 'polarArea'];
	type: string = this.graphTypes[0];
	chart: Chart;
	constructor(public auth: AuthService, public router: Router, private dialog: MatDialog) {}

	ngOnInit(): void {
		// always end first
		this.auth.user$.subscribe((user: User) => {
			this.user = user;
		});
		this.auth.records$.subscribe((records: Record[]) => {
			this.records = records;
			this.initUserData(this.user);
		});
	}

	initUserData(user: User) {
		this.startingDate = new Date(user.metadata.creationTime);
		this.totalDays = Math.floor(
			(new Date().getTime() - this.startingDate.getTime()) / (1000 * 3600 * 24)
		);
		let recordsSinceStartingDate: Record[] = this.records.filter((record: Record) => {
			return new Date(record.date) > this.startingDate;
		});
		this.percentage = Math.round((recordsSinceStartingDate.length / this.totalDays) * 100); // ! bad --> should take into consideration "date" for the records
	}

	ngAfterViewInit(): void {
		let ctx = this.polarArea.nativeElement.getContext('2d');
		let backgroundColors: string[] = [];
		let labels: string[] = [];
		let data: number[] = [];
		this.emotions.forEach((emotion: Emotion) => {
			backgroundColors.push(emotion.color.rgba.value);
			labels.push(emotion.text + ' ' + emotion.emoji);
			data.push(Math.ceil(Math.random() * 100));
		});
		this.chart = new Chart(ctx, {
			type: this.type,
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Days for Emotions',
						data: data,
						backgroundColor: backgroundColors,
					},
				],
			},
		});
	}

	changeType(type: string) {
		this.chart.config.type = type;
		this.chart.update({ duration: 2000 });
		console.info(this.chart.config.type);
	}

	openDialog(): void {
		this.dialog.open(DialogInfoComponent, {
			width: '350px',
			data: this.infoData,
		});
	}
}
