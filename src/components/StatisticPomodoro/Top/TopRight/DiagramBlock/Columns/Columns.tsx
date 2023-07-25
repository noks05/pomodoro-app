import React from "react";
import { generateRandomString } from "../../../../../../utils/generateRandomString";
import {
  IStatisticDayData,
  IStorePomodoroBox,
} from "../../../../../../interface";
import { useStoreState } from "easy-peasy";
import { getTimeOfSeconds } from "../../../../../../utils/glopFunction";
import styles from "./columns.module.css";

export function Columns() {
  const dataForWeek = useStoreState<IStorePomodoroBox>(
    state => state.statisticWeekData
  );
  const numDay = useStoreState<IStorePomodoroBox>(state => state.numDay);
  const defaultSeconds = useStoreState<IStorePomodoroBox>(
    state => state.defaultSeconds
  );

  const minOnePomodoro = getTimeOfSeconds(defaultSeconds.timeWork).allMin;
  const stepTime = 84 / minOnePomodoro;

  let minWeek = [0, 0, 0, 0, 0, 0, 0];
  if (dataForWeek) {
    dataForWeek.forEach((obj: IStatisticDayData, i: number) => {
      minWeek[obj.day - 1] = getTimeOfSeconds(obj.work).allMin;
    });
  }

  function checkColor(index: number) {
    const resp =
      index + 1 === numDay ? styles.columnRed : styles.columnLightRed;
    return resp;
  }

  return (
    <div className={["flex", styles.container].join(" ")}>
      {minWeek.map((min: number, i: number) => (
        <div
          className={[styles.column, min > 2 ? checkColor(i) : ""].join(" ")}
          style={{ minHeight: `${min > 2 ? min * stepTime : 5}px` }}
          key={generateRandomString()}
        ></div>
      ))}
    </div>
  );
}
