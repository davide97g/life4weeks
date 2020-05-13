import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-square-second',
	templateUrl: './square-second.component.html',
	styleUrls: ['./square-second.component.sass'],
})
export class SquareSecondComponent implements OnInit {
	@Input('time') time: number = 1000;
	constructor() {}

	ngOnInit(): void {
		this.startAnimation();
	}
	startAnimation() {
		setTimeout(() => {}, this.time);
	}
}
