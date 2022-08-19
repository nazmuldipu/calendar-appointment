import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentModel } from 'src/app/models/AppointmentModel';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent implements OnInit {
  @Input() appointment!: AppointmentModel;
  @Output() onEdit = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.onClose.emit(true);
  }

  editAppointment() {
    this.onEdit.emit(true);
  }
}
