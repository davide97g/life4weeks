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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
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

/** @angular/fire */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

const config = {
	apiKey: 'AIzaSyCNSJuQECpfGQKEnAjjQ5fDQLQAYq9m3Go',
	authDomain: 'life-4-weeks.firebaseapp.com',
	databaseURL: 'https://life-4-weeks.firebaseio.com',
	projectId: 'life-4-weeks',
	storageBucket: 'life-4-weeks.appspot.com',
	messagingSenderId: '958281435817',
	appId: '1:958281435817:web:561db3c0aa8ac456bd77b8',
	measurementId: 'G-0TN1VDT32Z',
};

import { SearchComponent } from '@pages/diary/search/search.component';
import { NewRecordComponent } from '@pages/diary/new-record/new-record.component';
import { OverviewComponent } from '@pages/diary/overview/overview.component';

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
		SearchComponent,
		NewRecordComponent,
		OverviewComponent,
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
		AngularFireModule.initializeApp(config),
		AngularFirestoreModule,
		AngularFireAuthModule,
		MatSelectModule,
		MatProgressBarModule,
		MatRadioModule,
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
