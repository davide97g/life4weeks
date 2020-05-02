import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Record } from '@models/record';
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
	user: User;
	records: Record[] = [];
	recordsSinceStartingDate: Record[] = []; // ? records since startingDate
	startingDate: Date; // ? read from database
	totalDays: number; // ? difference (in days) between starting date and current date
	percentage: number; // ? recorded / totalDays
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
			this.initUserData();
			this.updateChartData();
		});
	}

	initUserData() {
		this.startingDate = new Date(this.user.metadata.creationTime);
		this.totalDays = Math.floor(
			(new Date().getTime() - this.startingDate.getTime()) / (1000 * 3600 * 24)
		);
		this.recordsSinceStartingDate = this.records.filter((record: Record) => {
			return new Date(record.date) >= this.startingDate;
		});
		this.percentage = Math.round((this.recordsSinceStartingDate.length / this.totalDays) * 100);
	}

	ngAfterViewInit(): void {
		let ctx = this.polarArea.nativeElement.getContext('2d');
		let backgroundColors: string[] = [];
		let labels: string[] = [];
		let data: number[] = [];
		this.emotions.forEach((emotion: Emotion) => {
			backgroundColors.push(emotion.color.rgba.value);
			labels.push(emotion.text + ' ' + emotion.emoji);
			data.push(this.getDaysEmotion(emotion));
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
			options: {
				legend: {
					position: 'right',
				},
			},
		});
	}

	updateChartData(): void {
		let data: number[] = [];
		this.emotions.forEach((emotion: Emotion) => data.push(this.getDaysEmotion(emotion)));
		this.chart.data.datasets[0].data = data;
		this.chart.update({ duration: 2000 });
	}

	getDaysEmotion(emotion: Emotion): number {
		let tot: number = 0;
		this.recordsSinceStartingDate.forEach((record: Record) => {
			if (record.emotion.text === emotion.text) tot++;
		});
		return tot;
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
