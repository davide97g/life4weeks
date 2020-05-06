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
	user: User = null;
	records: Record[] = [];
	emotions: Emotion[] = EmotionList;
	recordsSinceStartingDate: Record[] = []; // ? records since startingDate
	startingDate: Date = null; // ? read from database
	totalDays: number = 0; // ? difference (in days) between starting date and current date
	percentage: number = 0; // ? recorded / totalDays
	infoData: InfoData = {
		title: 'Our statistics',
		messages: [
			'Starting date : the first time you logged',
			'Total days : the number of days since you became a member',
			'Days recorded : how many days recorded of the total since you registered, in percentage',
		],
	};
	@ViewChild('graph') graph: ElementRef;
	graphTypes: string[] = ['doughnut', 'polarArea'];
	type: string = this.graphTypes[0];
	chart: Chart = null;
	canvas: any = null;
	ctx: any = null;
	data: number[] = [];
	labels: string[] = [];
	backgroundColors: string[] = [];

	constructor(public auth: AuthService, public router: Router, private dialog: MatDialog) {}

	ngOnInit(): void {
		console.info('ngOnInit');
		this.auth.user$.subscribe((user: User) => {
			this.user = user;
		});
		this.auth.records$.subscribe((records: Record[]) => {
			this.records = records;
			this.initUserData();
			this.updateChart();
		});
	}

	ngAfterViewInit(): void {
		console.info('ngAfterViewInit');
		this.canvas = document.createElement('CANVAS');
		this.ctx = this.canvas.getContext('2d');
		this.graph.nativeElement.appendChild(this.canvas);
		this.updateChart();
	}

	updateBackgroundColors(): void {
		console.info('updateBackgroundColors');
		this.backgroundColors = [];
		this.emotions.forEach((emotion: Emotion) =>
			this.backgroundColors.push(emotion.color.rgba.value)
		);
	}

	updateLabels(): void {
		console.info('updateLabels');
		this.labels = [];
		this.emotions.forEach((emotion: Emotion) =>
			this.labels.push(emotion.text + ' ' + emotion.emoji)
		);
	}

	updateData(): void {
		console.info('updateData');
		this.data = [];
		this.emotions.forEach((emotion: Emotion) => {
			this.data.push(this.getDaysEmotion(emotion, this.recordsSinceStartingDate));
		});
	}

	/**
	 * @description creates the chart with the input parameters
	 */
	newChart(
		ctx: any,
		type: string,
		data: number[],
		labels: string[],
		backgroundColors: string[],
		title?: string
	): Chart {
		console.info('newChart');
		let display: boolean = this.recordsSinceStartingDate.length == 0 ? false : true;
		return new Chart(ctx, {
			type: type,
			data: {
				labels: labels,
				datasets: [
					{
						label: title ? title : 'Days for Emotions',
						data: data,
						backgroundColor: backgroundColors,
					},
				],
			},
			options: {
				legend: {
					display: display,
					position: 'right',
				},
			},
		});
	}

	/**
	 * @description fill the statistics from the user's data
	 */
	initUserData(): void {
		console.info('initUserData');
		this.startingDate = new Date(this.user.metadata.creationTime);
		this.totalDays =
			Math.floor((new Date().getTime() - this.startingDate.getTime()) / (1000 * 3600 * 24)) +
			1;
		this.recordsSinceStartingDate = this.records.filter((record: Record) => {
			return new Date(record.date) >= this.startingDate;
		});
		this.percentage = Math.round((this.recordsSinceStartingDate.length / this.totalDays) * 100);
	}

	/**
	 * @description updates the chart with the data from records
	 */
	updateChart(): void {
		console.info('updateChartData');
		// this.chart.data.datasets[0].data = this.getData();
		// this.chart.update({ duration: 2000 });
		this.updateBackgroundColors();
		this.updateLabels();
		this.updateData();

		this.chart = this.newChart(
			this.ctx,
			this.type,
			this.data,
			this.labels,
			this.backgroundColors
		);
	}

	/**
	 *
	 * @param emotion
	 */
	getDaysEmotion(emotion: Emotion, records: Record[]): number {
		console.info('getDaysEmotion');
		let tot: number = 0;
		records.forEach((record: Record) => {
			if (record.emotion.text === emotion.text) tot++;
		});
		return tot;
	}

	/**
	 * @description changes the graph type of the chart
	 * @param type graph type
	 */
	changeType(type: string) {
		console.info('changeType', type);
		this.type = type;
		this.updateChart();
	}

	/**
	 * @description opens the info dialog
	 */
	openDialog(): void {
		this.dialog.open(DialogInfoComponent, {
			width: '350px',
			data: this.infoData,
		});
	}
}
