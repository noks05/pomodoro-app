import React from "react";
import { IStatisticDayData } from "../../../../../interface";
import { getTimeOfSeconds } from "../../../../../utils/glopFunction";
import styles from "./timeforday.module.css";

export function TimeForDay({
  dataToday,
  numDay,
}: {
  dataToday: IStatisticDayData;
  numDay: number;
}) {
  const week = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];
  let value = "";
  const nameDay = week[numDay - 1];

  if (dataToday) {
    const time = getTimeOfSeconds(dataToday.work);

    const endingHour = time.hour < 2 ? "а" : "ов";
    const endinMin = time.min < 2 ? "ы" : "";

    const hour = time.hour ? `${time.hour} час${endingHour}` : "";
    const min = time.min ? `${time.min} минут${endinMin}` : "";

    if (time.hour || time.min) {
      value = `${hour} ${min}`;
    }
  }

  return (
    <div className={styles.top}>
      <h2 className={styles.title}>{nameDay}</h2>
      {value ? (
        <p className={styles.descr}>
          Вы работали над задачами в течение{" "}
          <span className={styles.time}>{value}</span>
        </p>
      ) : (
        <span className={styles.descr}>Нет данных</span>
      )}
    </div>
  );
}
