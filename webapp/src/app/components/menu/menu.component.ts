import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.sass'],
})
export class MenuComponent implements OnInit {
	title: string = 'Life in Weeks';
	constructor() {}

	ngOnInit(): void {}

	clickTest(page: string) {
		console.info('you clicked: ' + page);
	}
}
