import React, { ChangeEvent, useEffect } from "react";
import Choices from "choices.js";
import { useStoreActions, useStoreState } from "easy-peasy";
import { IStorePomodoroBox } from "../../../interface";
import { getLSData } from "../../../utils/glopFunction";
import { getStatisticForWeek } from "../../../utils/statisticData";
import styles from "./title.module.css";

export function Title() {
  const keyStatisticLS = useStoreState<IStorePomodoroBox>(
    state => state.keyLocalStorageStatistic
  );
  const setDataForWeek = useStoreActions<IStorePomodoroBox>(
    state => state.setDataForWeek
  );
  const statisticData = getLSData(keyStatisticLS);

  useEffect(() => {
    const element = document.querySelector(".select-choices");
    const choices = new Choices(element ? element : "", {
      allowHTML: true,
      searchEnabled: false,
    });
  }, []);

  function handleClick(e: ChangeEvent<HTMLSelectElement>) {
    let indexWeek = 0;

    switch (e.target.value) {
      case "Прошедшая неделя":
        indexWeek = 1;
        break;
      case "2 недели назад":
        indexWeek = 2;
        break;
    }

    setDataForWeek(getStatisticForWeek(statisticData, indexWeek));
  }
  return (
    <div className={["flex", "justify-between", styles.wrapTitle].join(" ")}>
      <h1 className={styles.title}>Ваша активность</h1>{" "}
      <select
        className="select-choices"
        name="Временной промежуток"
        onChange={e => handleClick(e)}
      >
        <option value="Эта неделя">Эта неделя</option>
        <option value="Прошедшая неделя">Прошедшая неделя</option>
        <option value="2 недели назад">2 недели назад</option>
      </select>
    </div>
  );
}
