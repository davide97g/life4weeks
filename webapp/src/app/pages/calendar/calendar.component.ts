import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { range, interval } from 'rxjs';

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
	id: string;
}

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent {
	triples: triple[] = [
		{ label: 'Elementary at', begin: '5', duration: '6', id: 'el' },
		{ label: 'Middle school at', begin: '11', duration: '3', id: 'mi' },
		{ label: 'High School at', begin: '14', duration: '4', id: 'hi' },
		{ label: 'College at', begin: '18', duration: '4', id: 'co' },
		{ label: 'University at', begin: '22', duration: '4', id: 'un' },
		{ label: 'Started working at', begin: '26', duration: '36', id: 'work' },
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
		{
			inizio: { k: 6, i: 0},
			fine: { k: 11, i: 0 },
			color: '#ababab',
			name: this.triples[0].id,
		},
		{
			inizio: { k: 11, i: 0 },
			fine: { k: 14, i: 0 },
			color: '#fff000',
			name: this.triples[1].id,
		},
		{
			inizio: { k: 14, i: 0 },
			fine: { k: 18, i: 0 },
			color: '#99ff99',
			name: this.triples[2].id,
		},
		{
			inizio: { k: 18, i: 0 },
			fine: { k: 22, i: 0 },
			color: '#99d6ff',
			name: this.triples[3].id,
		},
		{
			inizio: { k: 22, i: 0 },
			fine: { k: 26, i: 0 },
			color: '#ebadd6',
			name: this.triples[4].id,
		},
		{
			inizio: { k: 26, i: 0 },
			fine: { k: 62, i: 0 },
			color: '#ff9999',
			name: this.triples[5].id,
		},
		{ inizio: { k: 62, i: 0 }, fine: { k: 90, i: 0 }, color: '#dfbf9f', name: 'ret' },
	];
	myFun(k: number, i: number): string {
		this.intervals.forEach((interval: Interval) => {
			interval.inizio = {
				k: +(<HTMLInputElement>document.getElementById(interval.name + 'begin')).value,
				i: 0,
			};
			interval.fine = {
				k:
					+(<HTMLInputElement>document.getElementById(interval.name + 'begin')).value +
					+(<HTMLInputElement>document.getElementById(interval.name + 'duration')).value,
				i: 0,
			};
		});

		let x: string = '';
		this.intervals.forEach((interval: Interval) => {
			if (
				k * 53 + i < interval.fine.k * 53 + interval.fine.i &&
				k * 53 + i > interval.inizio.k * 53 + interval.inizio.i
			)
				x = interval.color;
		});
		return x;
	}
}

interface Interval {
	inizio: { k: number; i: number };
	fine: { k: number; i: number };
	color: string;
	name: string;
}
