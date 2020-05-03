import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user';
@Component({
	selector: 'app-diary',
	templateUrl: './diary.component.html',
	styleUrls: ['./diary.component.sass'],
})
export class DiaryComponent implements OnInit {
	constructor(private auth: AuthService) {
		this.auth.user$.subscribe(() => this.auth.readRecords());
	}
	ngOnInit(): void {}
}
