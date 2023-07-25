import React from "react";
import { FocusStat } from "../../../img/FocusStat";
import { PauseStat } from "../../../img/PauseStat";
import { StopStat } from "../../../img/StopStat";
import { getHourMinString } from "../../../../utils/glopFunction";
import { INumberDataProps } from "../../../../interface";
import styles from "./numberdatablock.module.css";

export function NumberDataBlock({
  title,
  dataDay,
  stylesBox,
}: INumberDataProps) {
  let value: string | number = 0;
  let sign: string = "";

  if (dataDay) {
    switch (stylesBox) {
      case "boxFocus":
        const sum = dataDay.work + dataDay.pause;
        if (sum) {
          value = `${Math.round(
            (dataDay.work / (dataDay.work + dataDay.pause)) * 100
          )}%`;
        }
        sign = "%";

        break;
      case "boxPause":
        value = getHourMinString(value, dataDay.pause);
        sign = "м";

        break;
      case "boxStop":
        value = dataDay.stop;
        break;
    }
  }
  return (
    <div
      className={[
        "flex",
        "justify-between",
        styles.box,
        styles[stylesBox],
        !value ? "empty" : "",
      ].join(" ")}
    >
      <div
        className={[
          "flex",
          "flex-column ",
          "justify-between",
          styles.textWrap,
        ].join(" ")}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.number}>{value ? value : `0${sign}`}</div>
      </div>

      {stylesBox === "boxFocus" && <FocusStat />}
      {stylesBox === "boxPause" && <PauseStat />}
      {stylesBox === "boxStop" && <StopStat />}
    </div>
  );
}
