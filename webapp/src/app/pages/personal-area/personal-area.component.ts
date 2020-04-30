import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { DiaryService } from '@services/diary/diary.service';
import { Record } from '@models/record';
@Component({
	selector: 'app-personal-area',
	templateUrl: './personal-area.component.html',
	styleUrls: ['./personal-area.component.sass'],
})
export class PersonalAreaComponent implements OnInit {
	records: Record[];
	constructor(private auth: AuthService, private diary: DiaryService) {
		this.auth.records$.subscribe((records: Record[]) => {
			this.records = records;
			this.diary.records.next(this.records); // send signal to listeners
		});
	}

	ngOnInit(): void {}
}
