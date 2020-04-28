import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { Record } from '@models/record';
import { DiaryService } from '@services/diary/diary.service';
@Component({
	selector: 'app-diary',
	templateUrl: './diary.component.html',
	styleUrls: ['./diary.component.sass'],
})
export class DiaryComponent implements OnInit {
	records: Record[];
	constructor(private auth: AuthService, private diary: DiaryService) {
		this.auth.records$.subscribe((records: Record[]) => {
			this.records = records;
			this.diary.records.next(this.records); // send signal to listeners
		});
	}
	ngOnInit(): void {}
}
