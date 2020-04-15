import { Component, OnInit } from '@angular/core';
import { CoreService } from '@services/core/core.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
	constructor(private core: CoreService) {}

	ngOnInit(): void {
		this.core.startUi();
	}
}
