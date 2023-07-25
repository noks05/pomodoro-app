export function changedLocalData(key, setState, newData) {
  saveSessionData(key, newData);
  setState(newData);
}

export function saveSessionData(key, arrData) {
  localStorage.setItem(key, JSON.stringify(arrData));
}

export function getLSData(keyLS) {
  const data = localStorage.getItem(keyLS);
  const check = data && data !== "undefined";
  let newData = null;

  if (check) {
    newData = JSON.parse(data);
  }
  return newData;
}

export function getFullDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dateDay = date.getDate();
  return {
    year,
    month,
    dateDay,
  };
}

export function getTimeData(now = false, myMilliseconds = null) {
  let dataObj;

  if (myMilliseconds) {
    dataObj = new Date(myMilliseconds);
  } else {
    dataObj = now
      ? new Date()
      : new Date(
          getFullDate(new Date()).year,
          getFullDate(new Date()).month,
          getFullDate(new Date()).dateDay
        );
  }

  const milliseconds = dataObj.getTime();
  const seconds = Math.round(milliseconds / 1000);

  const dayNum = dataObj.getDay();
  const day = Number(dayNum) === 0 ? 7 : dayNum;

  return { seconds, milliseconds, day };
}

export function getTimeOfSeconds(seconds) {
  const allMin = Math.floor(seconds / 60);
  const hour = Math.floor(allMin / 60);
  const min = allMin % 60;
  const lastSeconds = seconds % 60;
  return {
    allMin,
    hour,
    min,
    lastSeconds,
  };
}

export function getHourMinString(value, seconds) {
  const time = getTimeOfSeconds(seconds);
  const hour = time.hour ? `${time.hour}ч` : "";
  const min = time.min ? `${time.min}м` : "";

  if (time.hour || time.min) {
    value = `${hour} ${min}`;
  }

  return value;
}
