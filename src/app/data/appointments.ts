import { AppointmentModel } from '../models/AppointmentModel';

export const appointments: AppointmentModel[] = [
  {
    id: '202208021030',
    yearMonth: '202208',
    hourMinute: 1030,
    firstName: 'Habib',
    lastName: 'Hira',
    email: 'habib@gmail.com',
    gender: 'Male',
    age: 32,
    date: {
      day: 2,
      month: 8,
      year: 2022,
    },
    time: {
      hour: 10,
      minute: 30,
    },
  },
  {
    id: '202208021100',
    yearMonth: '202208',
    hourMinute: 1100,
    firstName: 'Malik',
    lastName: 'Jubayer',
    email: 'malik@gmail.com',
    gender: 'Male',
    age: 33,
    date: {
      day: 2,
      month: 8,
      year: 2022,
    },
    time: {
      hour: 11,
      minute: 0,
    },
  },
  {
    id: '202209020900',
    yearMonth: '202209',
    hourMinute: 900,
    firstName: 'Hasan',
    lastName: 'Abdullah',
    email: 'hasan@gmail.com',
    gender: 'Male',
    age: 33,
    date: {
      day: 2,
      month: 9,
      year: 2022,
    },
    time: {
      hour: 9,
      minute: 0,
    },
  },
];
