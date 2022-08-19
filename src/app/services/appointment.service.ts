import { Injectable } from '@angular/core';
import { appointments } from '../data/appointments';
import { AppointmentModel } from '../models/AppointmentModel';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  key = 'appointments';
  constructor(private localService: LocalService) {
    if (this.getAppointments() === null) {
      this.localService.saveData(this.key, appointments);
    }
  }

  public getAppointments(): AppointmentModel[] {
    return this.localService.getData(this.key);
  }
  public addAppointment(appointment: AppointmentModel): void {
    const appointments = this.getAppointments();
    appointments.push(appointment);
    this.localService.saveData(this.key, appointments);
  }

  public removeAppointment(appointment: AppointmentModel): void {
    const appointments = this.getAppointments();
    const index = appointments.findIndex((a) => a.id === appointment.id);
    appointments.splice(index, 1);
    this.localService.saveData(this.key, appointments);
  }

  public updateAppointment(appointment: AppointmentModel): void {
    let appointments = this.getAppointments();
    const index = appointments.findIndex((a) => a.id === appointment.id);
    if (index > -1) {
      appointments.splice(index, 1, appointment);
    }
    this.localService.saveData(this.key, appointments);
  }
}
