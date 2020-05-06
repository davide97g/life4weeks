import { Component } from '@angular/core';
import { CoreService } from '@services/core/core.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
})
export class AppComponent {
	title = 'webapp';
	constructor(private core:CoreService) {}
}
