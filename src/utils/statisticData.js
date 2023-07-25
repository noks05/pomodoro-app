import { getFullDate, getLSData, getTimeData } from "./glopFunction";

export function createDataStatistic(addProps) {
  function getMillisecondsToday() {
    const milliseconds = new Date(
      getFullDate(new Date()).year,
      getFullDate(new Date()).month,
      getFullDate(new Date()).dateDay
    ).getTime();

    return milliseconds;
  }
  const dayStat = {
    dateCreate: getMillisecondsToday(),
    work: 0,
    startPause: 0,
    pause: 0,
    stop: 0,
    pomodoro: 0,
    day: getTimeData().day,
    ...addProps,
  };

  return dayStat;
}

function changedPropsDataStat(arrKeys, newProps, oldProps) {
  switch (arrKeys[0]) {
    case "startPause":
    case "stop":
      newProps.stop = oldProps.stop + newProps.stop;
      break;
    case "pause":
      newProps.pause = newProps.pause - oldProps.startPause + oldProps.pause;
      break;
    case "work":
    case "pomodoro":
      newProps.work = oldProps.work + newProps.work;
      newProps.pomodoro = oldProps.pomodoro + newProps.pomodoro;
      break;
    default:
      break;
  }
  return newProps;
}

export function changedDataStatistic(oldData, addProps) {
  let newData;

  const numDay = getTimeData().day;
  const lastDataDay = oldData[oldData.length - 1];
  const keys = Object.keys(addProps);

  if (lastDataDay.day === numDay) {
    const newProps = changedPropsDataStat(keys, addProps, lastDataDay);

    newData = [
      ...oldData.slice(0, oldData.length - 1),
      {
        ...lastDataDay,
        ...newProps,
      },
    ];
  } else {
    newData = [...oldData, createDataStatistic(addProps)];
  }

  return newData;
}

export function setDataStatistic(keyLsStatistic, addProps) {
  const oldData = getLSData(keyLsStatistic);
  let newDataStatistic;

  if (!oldData.length) {
    const newData = createDataStatistic(addProps);
    newDataStatistic = [newData];
  } else {
    newDataStatistic = changedDataStatistic(oldData, addProps);
  }
  localStorage.setItem(keyLsStatistic, JSON.stringify(newDataStatistic));
}

export function filterStatisticData(data) {
  const millisecondsDay = 24 * 60 * 60 * 1000;
  const millisecondsTwoWeeks = millisecondsDay * 14;
  const millisecondsToday = getTimeData().milliseconds;
  const numToday = getTimeData().day;
  const threeWeeksAgo =
    millisecondsToday - millisecondsTwoWeeks - millisecondsDay * numToday;

  let newData = [];
  let i = data ? data.length - 1 : -1;

  while (i >= 0) {
    const isThreeWeeks = data[i].dateCreate >= threeWeeksAgo;

    if (isThreeWeeks) {
      newData = [data[i], ...newData];
    } else {
      i = -1;
    }
    --i;
  }
  return newData;
}

export function getStatisticForWeek(data, numWeek = 0) {
  const millisecondsDay = 24 * 60 * 60 * 1000;
  const todayMilliseconds = getTimeData().milliseconds;
  const numToday = getTimeData().day;
  let endWeek = todayMilliseconds;
  let startWeek = todayMilliseconds - millisecondsDay * numToday;

  switch (numWeek) {
    case 1:
      endWeek = todayMilliseconds - millisecondsDay * numToday;
      startWeek = todayMilliseconds - millisecondsDay * (7 + numToday);
      break;
    case 2:
      endWeek = todayMilliseconds - millisecondsDay * (7 + numToday);
      startWeek = todayMilliseconds - millisecondsDay * (14 + numToday);
      break;
    default:
      break;
  }
  const newData = data.filter(obj => {
    const result = obj.dateCreate > startWeek && obj.dateCreate <= endWeek;
    return result;
  });
  return newData;
}
