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

interface Day {
  day: number;
  appointments: AppointmentModel[];
  month: number;
  year: number;
  isWeekend: boolean;
  isToday: boolean;
  isEmpty: boolean;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() date!: string;
  @Input() appointments: AppointmentModel[] = [];
  @Output() update = new EventEmitter<AppointmentModel>();

  showCalenderModal: boolean = false;
  appointment!: AppointmentModel;

  month!: number;
  year!: number;
  dayList: Day[] = [];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor() {}

  ngOnInit(): void {
    let spDate = this.date.split('-');
    this.month = parseInt(spDate[0], 10) - 1;
    this.year = parseInt(spDate[1], 10);
    this.populateDayList(this.year, this.month);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['appointments'] &&
      this.appointments &&
      this.appointments.length > 0
    ) {
      this.populateDayList(this.year, this.month);
    }
  }

  getTotalDays = function (year: number, month: number) {
    const days = getDaysInMonth(year, month);
    const before = new Date(year, month, 1).getDay();
    return days + before;
  };

  populateDayList = (year: number, month: number) => {
    const days = getDaysInMonth(year, month);
    const before = new Date(year, month, 1).getDay();
    const totalCell = days + before;
    const now = new Date();
    this.dayList = [];
    for (let i = 0; i < totalCell; i++) {
      const day = new Date(year, month, 1 + (i - before));
      const isToday = compareDates(day, now);
      const isEmpty = i < before;
      const isWeekend =
        day.getDay() != 0 && (day.getDay() % 4 == 0 || day.getDay() % 5 == 0);
      const dayNumber = 1 + (i - before);
      const todayAppointents = this.appointments?.filter(
        (app) => app.date.day === dayNumber
      );
      todayAppointents?.sort((a, b) => b.hourMinute - a.hourMinute);
      this.dayList.push({
        day: dayNumber,
        appointments: todayAppointents,
        month,
        year,
        isWeekend,
        isToday,
        isEmpty,
      });
    }
  };

  handleAppointmentClick = (appointment: AppointmentModel) => {
    this.appointment = appointment;
    this.showCalenderModal = true;
  };

  onUpdate(event: AppointmentModel) {
    this.update.emit(event);
    this.showCalenderModal = false;
  }

  onDropDownChange(event: any) {
    let index = this.appointments.findIndex((app) => app.id === event.value);
    if (index > -1) {
      this.appointment = this.appointments[index];
      this.showCalenderModal = true;
    }
  }
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function compareDates(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDaysInMonth(year: number, month: number): number {
  return [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month];
}
