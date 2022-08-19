import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentModel } from 'src/app/models/AppointmentModel';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit {
  id!: string;
  yearMonth!: string;
  appointments: AppointmentModel[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Populate the datas
    this.id = this.activatedRoute.snapshot.params['id'];
    if (!this.id || !this.validateId(this.id)) {
      this.setThisMonth();
    }
    this.yearMonth =
      this.id.split('-')[1] +
      (parseInt(this.id.split('-')[0]) < 10 ? '0' : '') +
      this.id.split('-')[0];

    this.getAppointments();
    // this.appointments = this.appointmentService
    //   .getAppointments()
    //   .filter((appointment) => appointment.yearMonth === this.yearMonth);
  }

  getAppointments() {
    this.appointments = this.appointmentService
      .getAppointments()
      ?.filter((appointment) => appointment.yearMonth === this.yearMonth);
  }

  setThisMonth(): void {
    const date = new Date();
    this.id = date.getMonth() + 1 + '-' + date.getFullYear();
    this.route.navigate(['/month', this.id]);
  }

  onCreate(event: AppointmentModel) {
    this.appointmentService.addAppointment(event);
    this.getAppointments();
  }

  onUpdate(event: AppointmentModel) {
    this.appointmentService.updateAppointment(event);
    this.getAppointments();
  }

  validateId = (id: string) => {
    let dd = id.split('-');
    let month = parseInt(dd[0], 10);
    let year = parseInt(dd[1], 10);
    if (
      !month ||
      !year ||
      month > 12 ||
      month < 1 ||
      year < 2000 ||
      year > 2099
    ) {
      return false;
    }
    return true;
  };
}
