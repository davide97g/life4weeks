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
	// graph variables
	@ViewChild('graph') graph: ElementRef;
	graphTypes: string[] = ['doughnut', 'polarArea'];
	type: string = this.graphTypes[0];
	canvas: any = null; // html element
	// chart variables
	data: number[] = [];
	labels: string[] = [];
	backgroundColors: string[] = [];
	chart: Chart = null;

	constructor(public auth: AuthService, public router: Router, private dialog: MatDialog) {}

	ngOnInit(): void {
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
		this.canvas = document.createElement('CANVAS');
		this.graph.nativeElement.appendChild(this.canvas);
		this.updateChart();
	}

	/**
	 * @description update background colors
	 */
	updateBackgroundColors(): void {
		this.backgroundColors = [];
		this.emotions.forEach((emotion: Emotion) =>
			this.backgroundColors.push(emotion.color.rgba.value)
		);
	}
	/**
	 * @description update labels
	 */
	updateLabels(): void {
		this.labels = [];
		this.emotions.forEach((emotion: Emotion) =>
			this.labels.push(emotion.text + ' ' + emotion.emoji)
		);
	}
	/**
	 * @description update data
	 */
	updateData(): void {
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
		let displayLegend: boolean = this.recordsSinceStartingDate.length == 0 ? false : true;
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
					display: displayLegend,
					position: 'right',
				},
			},
		});
	}

	/**
	 * @description fill the statistics from the user's data
	 */
	initUserData(): void {
		this.startingDate = new Date(this.user.metadata.creationTime);
		this.totalDays =
			Math.ceil((new Date().getTime() - this.startingDate.getTime()) / (1000 * 3600 * 24)) +
			1;
		this.recordsSinceStartingDate = this.records.filter((record: Record) => {
			return new Date(record.date) >= this.startingDate;
		});
		this.percentage =
			Math.round((this.recordsSinceStartingDate.length / this.totalDays) * 1000) / 10;
	}

	/**
	 * @description updates the chart with the data from records
	 */
	updateChart(): void {
		this.updateBackgroundColors();
		this.updateLabels();
		this.updateData();
		if (this.chart !== null) this.chart.destroy();
		this.chart = this.newChart(
			this.canvas.getContext('2d'),
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
