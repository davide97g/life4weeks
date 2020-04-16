import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
/** @angular/material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
/** pages */
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PersonalAreaComponent } from './pages/personal-area/personal-area.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DiaryComponent } from './pages/diary/diary.component';
/** components */
import { MenuComponent } from '@components/menu/menu.component';
/** services */
import { CoreService } from '@services/core/core.service';
import { UtilsService } from '@services/utils/utils.service';
@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		MenuComponent,
		NotFoundComponent,
		LoginComponent,
		PersonalAreaComponent,
		TermsOfServiceComponent,
		PrivacyPolicyComponent,
		CalendarComponent,
		DiaryComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
		MatNativeDateModule,
		MatDatepickerModule,
		MatStepperModule,
		ReactiveFormsModule,
		MatSelectModule,
	],
	providers: [
		CoreService,
		UtilsService,
		MatDatepickerModule,
		MatInputModule,
		FormsModule,
		{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
