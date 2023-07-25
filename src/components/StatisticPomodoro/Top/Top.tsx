import React from "react";
import { TopLeft } from "./TopLeft";
import { TopRight } from "./TopRight";
import { IStatisticDayData } from "../../../interface";
import styles from "./top.module.css";

export function Top({
  dataToday,
  numDay,
}: {
  dataToday: IStatisticDayData;
  numDay: number;
}) {
  return (
    <div className={[styles.container, "flex"].join(" ")}>
      <TopLeft dataToday={dataToday} numDay={numDay} />
      <TopRight />
    </div>
  );
}
