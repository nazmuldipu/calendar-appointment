import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthComponent } from './container/month/month.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarModalComponent } from './components/calendar-modal/calendar-modal.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    NavbarComponent,
    CalendarComponent,
    CalendarModalComponent,
    AppointmentDetailsComponent,
    AppointmentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
