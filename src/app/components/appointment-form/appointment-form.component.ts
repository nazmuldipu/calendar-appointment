import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  AppointmentModel,
  DateFormat,
  TimeFormat,
} from 'src/app/models/AppointmentModel';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent implements OnChanges {
  @Input() appointment!: AppointmentModel;

  @Output() create = new EventEmitter<AppointmentModel>();
  @Output() update = new EventEmitter<AppointmentModel>();
  @Output() delete = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<boolean>();

  form!: FormGroup;
  errorMessage: string = '';
  exists = false;
  mouseoverShifting = false;
  ngDate!: any;
  ngTime!: any;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appointment'] && this.appointment != null) {
      this.form.reset();
      this.exists = true;
      this.ngDate = this.getDateString(this.appointment.date);
      this.ngTime = this.getTimeString(this.appointment.time);
      this.form.patchValue({
        ...this.appointment,
        date: this.ngDate,
        time: this.ngTime,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male'],
      age: [''],
      date: [this.ngDate, Validators.required],
      time: [this.ngTime, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.errorMessage = '';
      let formValue = this.form.value;
      let date = this.getDateFormat(formValue.date);
      let time = this.getTimeFormat(formValue.time);
      let yearMonth = this.getYearMonth(formValue.date);
      let hourMinute = this.gethourMinute(time);
      let id = this.getId();
      const value = {
        ...this.form.value,
        id,
        date,
        time,
        yearMonth,
        hourMinute,
      } as AppointmentModel;

      if (this.exists) {
        this.update.emit({ ...value, id: this.appointment.id });
      } else {
        this.create.emit(value);
      }
      this.clear();
    } else {
      this.errorMessage = this.getFormValidationErrors();
    }
  }

  getId(): string {
    let date = new Date();
    return `${date.getFullYear}${this.getTwoDigitString(
      date.getMonth()
    )}${this.getTwoDigitString(date.getDate())}${this.getTwoDigitString(
      date.getHours()
    )}${this.getTwoDigitString(date.getMinutes())}${this.getTwoDigitString(
      date.getSeconds()
    )}`;
  }

  getTwoDigitString(num: number): string {
    return `${num < 10 ? '0' : ''}${num}`;
  }

  getDateFormat(date: string): DateFormat {
    let temp = date.split('-');
    return {
      year: parseInt(temp[0]),
      month: parseInt(temp[1]),
      day: parseInt(temp[2]),
    };
  }

  getDateString(date: DateFormat): string {
    return `${date.year}-${this.getTwoDigitString(
      date.month
    )}-${this.getTwoDigitString(date.day)}`;
  }

  getTimeFormat(time: string): TimeFormat {
    let temp = time.split(':');
    return {
      hour: parseInt(temp[0]),
      minute: parseInt(temp[1]),
    };
  }

  getTimeString(time: TimeFormat): string {
    return `${this.getTwoDigitString(time.hour)}:${this.getTwoDigitString(
      time.minute
    )}`;
  }

  getYearMonth(date: string): string {
    let temp = date.split('-');
    return temp[0] + temp[1];
  }

  gethourMinute(time: TimeFormat) {
    return time.hour * 100 + time.minute;
  }

  getFormValidationErrors() {
    let errors = '';
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.form.get(key)
        ?.errors as ValidationErrors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors += this.keyValues[key] + ' : ' + keyError + '; ';
        });
      }
    });
    return errors;
  }

  clear() {
    this.errorMessage = '';
    this.form.reset();
    const value = {
      gender: 'Male',
    };
    this.form.patchValue(value);
  }

  close() {
    this.onClose.emit(true);
  }

  keyValues: any = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    gender: 'Gender',
    age: 'Age',
    date: 'Date',
    time: 'Time',
  };
}
