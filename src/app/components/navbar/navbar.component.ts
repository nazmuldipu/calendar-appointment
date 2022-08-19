import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppointmentModel } from 'src/app/models/AppointmentModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() create = new EventEmitter<AppointmentModel>();

  showCalenderModal = false;

  constructor() {}

  ngOnInit(): void {}

  onCreate(event: AppointmentModel) {
    this.showCalenderModal = false;
    this.create.emit(event);
  }

  showModal() {
    this.showCalenderModal = true;
  }
}
