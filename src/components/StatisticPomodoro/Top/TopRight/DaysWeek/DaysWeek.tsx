import React from "react";
import { generateRandomString } from "../../../../../utils/generateRandomString";
import { useStoreActions, useStoreState } from "easy-peasy";
import { IStorePomodoroBox } from "../../../../../interface";
import styles from "./daysweek.module.css";

export function DaysWeek() {
  const numDay = useStoreState<IStorePomodoroBox>(state => state.numDay);
  const setNumDay = useStoreActions<IStorePomodoroBox>(
    state => state.setNumDay
  );
  const daysWeekText = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  function handleClick(indexItem: number) {
    setNumDay(indexItem + 1);
  }

  return (
    <div className={["flex", styles.container].join(" ")}>
      {daysWeekText.map((text, i) => (
        <button
          key={generateRandomString()}
          className={[
            "flex",
            "justify-center",
            "align-center",
            styles.day,
            numDay === i + 1 ? styles.dayBest : "",
          ].join(" ")}
          onClick={() => handleClick(i)}
          type="button"
        >
          {text}
        </button>
      ))}
    </div>
  );
}
