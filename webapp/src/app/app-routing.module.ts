import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { PersonalAreaComponent } from '@pages/personal-area/personal-area.component';
import { PrivacyPolicyComponent } from '@pages/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '@pages/terms-of-service/terms-of-service.component';
import { DiaryComponent } from '@pages/diary/diary.component';
import { CalendarComponent } from '@pages/calendar/calendar.component';
/** guards */
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';
const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
	{ path: 'home', component: HomeComponent },
	{ path: 'personal-area', component: PersonalAreaComponent, canActivate: [AuthGuard] },
	{ path: 'diary', component: DiaryComponent, canActivate: [AuthGuard] },
	{ path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
	{ path: 'privacy-policy', component: PrivacyPolicyComponent },
	{ path: 'terms-of-service', component: TermsOfServiceComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '**', component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
