import { Component, OnInit, ViewChild } from '@angular/core';
import { lifeExp, lifeExpectancies } from '@models/life-expectancy';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
	displayedColumns: string[] = Object.keys(lifeExpectancies[0]);
	datasource: MatTableDataSource<lifeExp> = new MatTableDataSource<lifeExp>(lifeExpectancies);
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	constructor() {}

	ngOnInit(): void {
		this.datasource.paginator = this.paginator;
	}
}
