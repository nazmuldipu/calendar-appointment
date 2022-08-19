import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AppointmentModel } from 'src/app/models/AppointmentModel';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss'],
})
export class CalendarModalComponent implements OnChanges {
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<AppointmentModel>();
  @Output() create = new EventEmitter<AppointmentModel>();

  @Input() appointment!: AppointmentModel;

  edit: boolean = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appointment'] && changes['appointment'].currentValue) {
      this.edit = false;
    }
  }

  closeModal() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  onEdit() {
    this.edit = true;
  }

  onUpdate(event: AppointmentModel) {
    this.update.emit(event);
  }

  onCreate(event: AppointmentModel) {
    this.create.emit(event);
  }
}
