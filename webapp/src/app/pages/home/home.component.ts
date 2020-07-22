import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
	animations: [
		trigger('zeroFull', [
			state(
				'zero',
				style({
					width: '0%',
					opacity: 0,
				})
			),
			state(
				'full',
				style({
					width: '100%',
					opacity: 1,
				})
			),
			transition('zero => full', [animate('0.5s ease-out')]),
		]),
	],
})
export class HomeComponent implements OnInit {
	state: string = 'zero';
	time: number = 500;
	constructor(public router: Router) {}

	ngOnInit(): void {
		setInterval(() => (this.state = this.state == 'zero' ? 'full' : 'zero'), this.time);
	}
}
