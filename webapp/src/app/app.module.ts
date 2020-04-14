import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/** pages */
import { HomeComponent } from '@pages/home/home.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
/** components */
import { MenuComponent } from '@components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
/** services */
@NgModule({
	declarations: [AppComponent, HomeComponent, MenuComponent, NotFoundComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
