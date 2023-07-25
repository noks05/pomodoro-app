import React from "react";
import { IStatisticDayData } from "../../../../interface";
import { TimeForDay } from "./TimeForDay";
import { PomodoroCount } from "./PomodoroCount";
import styles from "./topleft.module.css";

export function TopLeft({
  dataToday,
  numDay,
}: {
  dataToday: IStatisticDayData;
  numDay: number;
}) {
  return (
    <div className={["flex", "flex-column", styles.container].join(" ")}>
      <TimeForDay dataToday={dataToday} numDay={numDay} />
      <PomodoroCount dataToday={dataToday} />
    </div>
  );
}
