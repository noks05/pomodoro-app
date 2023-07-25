import React from "react";
import { Top } from "./Top";
import { Bottom } from "./Bottom";
import { Title } from "./Title";
import { useStoreState } from "easy-peasy";
import { IStatisticDayData, IStorePomodoroBox } from "../../interface";
import styles from "./statisticpomodoro.module.css";

export function StatisticPomodoro() {
  const dataForWeek = useStoreState<IStorePomodoroBox>(
    state => state.statisticWeekData
  );
  const numDay = useStoreState<IStorePomodoroBox>(state => state.numDay);

  let dataToday = null;

  if (dataForWeek && dataForWeek.length) {
    dataToday = dataForWeek.find(
      (obj: IStatisticDayData) => obj.day === numDay
    );
  }

  return (
    <div className={styles.container}>
      <Title />
      <Top dataToday={dataToday} numDay={numDay} />
      <Bottom dataToday={dataToday} />
    </div>
  );
}
