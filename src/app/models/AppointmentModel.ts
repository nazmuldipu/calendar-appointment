export interface AppointmentModel {
  id: string;
  yearMonth: string;
  hourMinute: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  date: DateFormat;
  time: TimeFormat;
}

export interface DateFormat {
  day: number;
  month: number;
  year: number;
}

export interface TimeFormat {
  hour: number;
  minute: number;
}
