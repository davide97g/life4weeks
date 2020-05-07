import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Settings } from '@models/settings';
@Component({
	selector: 'app-personal-area',
	templateUrl: './personal-area.component.html',
	styleUrls: ['./personal-area.component.sass'],
})
export class PersonalAreaComponent implements OnInit {
	constructor(private auth: AuthService) {
		this.auth.user$.subscribe(() => this.auth.readRecords());
		this.auth
			.readUserSettings()
			.then((settings: Settings) => this.auth.settings$.next(settings));
	}

	ngOnInit(): void {}
}
