import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
@Component({
	selector: 'app-personal-area',
	templateUrl: './personal-area.component.html',
	styleUrls: ['./personal-area.component.sass'],
})
export class PersonalAreaComponent implements OnInit {
	constructor(private auth: AuthService) {
		this.auth.readRecords(null);
	}

	ngOnInit(): void {}
}
