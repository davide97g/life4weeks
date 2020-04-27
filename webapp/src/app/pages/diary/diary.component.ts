import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-diary',
	templateUrl: './diary.component.html',
	styleUrls: ['./diary.component.sass'],
})
export class DiaryComponent implements OnInit {
	constructor() {
		console.info('diary');
	}

	// TODO centralizzare le chiamate in lettura al database in modo da leggere i dati il meno possibile

	ngOnInit(): void {}
}
