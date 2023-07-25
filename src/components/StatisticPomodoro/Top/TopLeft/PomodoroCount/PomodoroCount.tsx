import React from "react";
import { TomatoSmile } from "../../../../img/TomatoSmile";
import { Tomato } from "../../../../img/Tomato";
import { IStatisticDayData } from "../../../../../interface";
import styles from "./pomodorocount.module.css";

export function PomodoroCount({ dataToday }: { dataToday: IStatisticDayData }) {
  const classesImg = [
    "flex",
    "justify-center",
    "align-center",
    styles.img,
  ].join(" ");

  let pomodoro = 0;
  let endingPomodoro = "";

  if (dataToday) {
    if (dataToday.pomodoro > 1) {
      endingPomodoro = dataToday.pomodoro <= 4 ? "а" : "ов";
    }
    pomodoro = dataToday.pomodoro;
  }

  return (
    <div className={styles.bottom}>
      {pomodoro ? (
        <div className={["flex", "flex-column", styles.wrapCount].join(" ")}>
          <div className={classesImg}>
            <Tomato />
            <span className={styles.increment}>х&nbsp;{pomodoro}</span>
          </div>
          <div className={styles.text}>
            {pomodoro}&nbsp;помидор{endingPomodoro}
          </div>
        </div>
      ) : (
        <div
          className={[
            "flex",
            "align-center",
            "justify-center",
            styles.pomodoroSmile,
          ].join(" ")}
        >
          <TomatoSmile />
        </div>
      )}
    </div>
  );
}
