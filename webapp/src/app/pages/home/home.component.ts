import { Component, OnInit, ViewChild } from '@angular/core';
import { Country, countryList } from '@models/life-expectancy';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
	displayedColumns: string[] = Object.keys(countryList[0]);
	datasource: MatTableDataSource<Country> = new MatTableDataSource<Country>(countryList);
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor() {}

	ngOnInit(): void {
		this.datasource.paginator = this.paginator;
		this.datasource.sort = this.sort;
		this.datasource.sort.sortChange.subscribe(() => {
			this.datasource.sortData(this.datasource.filteredData, this.datasource.sort);
		});
	}

	clicked(row: any) {
		console.info(row);
	}

	addClass(row: Country): string {
		let index: number = this.datasource.data.findIndex((x: Country) => x === row);
		if (index === -1) return '';
		else {
			if (index === 0) return '#db642d';
			else if (index === 1) return '#ffd740';
			else if (index === 2) return '#3ec3ec';
		}
	}
}
