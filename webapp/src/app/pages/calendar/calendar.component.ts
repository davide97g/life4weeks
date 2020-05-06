import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { range } from 'rxjs';

interface State {
	value: string;
	viewValue: string;
}

interface StateGroup {
	disabled?: boolean;
	name: string;
	state: State[];
}

interface triple {
	label: string;
	begin: string;
	duration: string;
}

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent {
	triples: triple[] = [
		{ label: 'Elementary at', begin: '5', duration: '6' },
		{ label: 'Middle school at', begin: '11', duration: '3' },
		{ label: 'High School at', begin: '14', duration: '4' },
		{ label: 'College at', begin: '18', duration: '4' },
		{ label: 'University at', begin: '22', duration: '4' },
		{ label: 'Started working at', begin: '26', duration: '36' },
	];

	column: number[] = [];
	row: number[] = [];

	constructor() {
		for (let i = 1; i < 53; i++) {
			this.column.push(+i);
		}

		for (let i = 1; i < 90; i++) {
			this.row.push(+i);
		}
	}
	selected = 'IT';
	stateControl = new FormControl();
	stateGroups: StateGroup[] = [
		{
			name: 'Europe',
			state: [
				{ value: 'IT', viewValue: 'Italy' },
				{ value: 'FR', viewValue: 'France' },
				{ value: 'GR', viewValue: 'Germany' },
			],
		},
		{
			name: 'America',
			state: [
				{ value: 'US', viewValue: 'USA' },
				{ value: 'BR', viewValue: 'Brasil' },
				{ value: 'CA', viewValue: 'Canada' },
			],
		},
		{
			name: 'Asia',
			disabled: true,
			state: [
				{ value: 'CN', viewValue: 'China' },
				{ value: 'IN', viewValue: 'India' },
				{ value: 'IR', viewValue: 'Iran' },
			],
		},
		{
			name: 'Africa',
			state: [
				{ value: 'AL', viewValue: 'Algeria' },
				{ value: 'AN', viewValue: 'Angola' },
			],
		},
		{
			name: 'Oceania',
			state: [
				{ value: 'AU', viewValue: 'Australia' },
				{ value: 'FJ', viewValue: 'Fiji' },
			],
		},
	];
	intervals: Interval[] = [
		{ inizio: { k: 3, i: 8 }, fine: { k: 7, i: 25 }, color: '#ababab' },
		{ inizio: { k: 12, i: 8 }, fine: { k: 17, i: 25 }, color: '#fff000' },
	];
	myFun(k: number, i: number): string {
		let x: string = '';
		this.intervals.forEach((interval: Interval) => {
			if (k * 52 + i < interval.fine.k * 52 + interval.fine.i && k * 52 + i > interval.inizio.k * 52 + interval.inizio.i) x = interval.color;
		});
		return x;
	}
}

interface Interval {
	inizio: { k: number; i: number };
	fine: { k: number; i: number };
	color: string;
}
