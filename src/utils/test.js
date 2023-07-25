import { getFullDate } from "./glopFunction";

export const testStatisticData = [
  {
    dateCreate: (() => {
      const milliseconds =
        new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        ).getTime() -
        1000 * 60 * 60 * 24 * 11;
      return milliseconds;
    })(),
    work: 1500,
    startPause: 0,
    pause: 222,
    stop: 4,
    pomodoro: 3,
    day: (() => {
      const day = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 11
      ).getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
  {
    dateCreate: (() => {
      const milliseconds =
        new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        ).getTime() -
        1000 * 60 * 60 * 24 * 10;
      return milliseconds;
    })(),
    work: 500,
    startPause: 0,
    pause: 222,
    stop: 4,
    pomodoro: 3,
    day: (() => {
      const day = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 10
      ).getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
  {
    dateCreate: (() => {
      const milliseconds =
        new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        ).getTime() -
        1000 * 60 * 60 * 24 * 9;
      return milliseconds;
    })(),
    work: 1000,
    startPause: 0,
    pause: 33,
    stop: 4,
    pomodoro: 3,
    day: (() => {
      const day = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 9
      ).getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
  {
    dateCreate: (() => {
      const milliseconds =
        new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        ).getTime() -
        1000 * 60 * 60 * 24 * 8;
      return milliseconds;
    })(),
    work: 6000,
    startPause: 0,
    pause: 433,
    stop: 10,
    pomodoro: 3,
    day: (() => {
      const day = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 8
      ).getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
  {
    dateCreate: (() => {
      const milliseconds =
        new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        ).getTime() -
        1000 * 60 * 60 * 24 * 7;
      return milliseconds;
    })(),
    work: 5000,
    startPause: 0,
    pause: 331,
    stop: 14,
    pomodoro: 10,
    day: (() => {
      const day = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 7
      ).getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
  {
    dateCreate: (() => {
      const milliseconds =
        new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        ).getTime() -
        1000 * 60 * 60 * 24 * 6;
      return milliseconds;
    })(),
    work: 1456,
    startPause: 0,
    pause: 7,
    stop: 4,
    pomodoro: 3,
    day: (() => {
      const day = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 6
      ).getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
  {
    dateCreate: (() => {
      const milliseconds =
        new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        ).getTime() -
        1000 * 60 * 60 * 24 * 5;
      return milliseconds;
    })(),
    work: 3763,
    startPause: 0,
    pause: 33,
    stop: 4,
    pomodoro: 3,
    day: (() => {
      const day = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 5
      ).getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
  {
    dateCreate: (() => {
      const milliseconds =
        new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        ).getTime() -
        1000 * 60 * 60 * 24 * 4;
      return milliseconds;
    })(),
    work: 2763,
    startPause: 0,
    pause: 323,
    stop: 4,
    pomodoro: 3,
    day: (() => {
      const day = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 4
      ).getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
  {
    dateCreate: (() => {
      const milliseconds =
        new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        ).getTime() -
        1000 * 60 * 60 * 24 * 3;
      return milliseconds;
    })(),
    work: 1763,
    startPause: 0,
    pause: 133,
    stop: 4,
    pomodoro: 3,
    day: (() => {
      const day = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 3
      ).getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
  {
    dateCreate: (() => {
      const milliseconds =
        new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        ).getTime() -
        1000 * 60 * 60 * 24 * 2;
      return milliseconds;
    })(),
    work: 763,
    startPause: 0,
    pause: 733,
    stop: 4,
    pomodoro: 3,
    day: (() => {
      const day = new Date(
        new Date().getTime() - 1000 * 60 * 60 * 24 * 2
      ).getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
  {
    dateCreate: (() => {
      const milliseconds = new Date(
        getFullDate(new Date()).year,
        getFullDate(new Date()).month,
        getFullDate(new Date()).dateDay
      ).getTime();
      return milliseconds;
    })(),
    work: 1263,
    startPause: 0,
    pause: 222,
    stop: 4,
    pomodoro: 3,
    day: (() => {
      const day = new Date().getDay();
      const numDay = day === 0 ? 7 : day;
      return numDay;
    })(),
  },
];
