import React from "react";
import { getTimeOfSeconds } from "../../../../../../utils/glopFunction";
import styles from "./marker.module.css";

export function Marker({
  num,
  defaultSeconds,
}: {
  num: number;
  defaultSeconds: number;
}) {
  let value: string | number = 0;

  const time = getTimeOfSeconds(defaultSeconds * num);
  const hour = time.hour ? `${time.hour}ч` : "";
  const min = time.min ? `${time.min}мин` : "";

  if (time.hour || time.min) {
    value = `${hour} ${min}`;
  }

  return (
    <div className={[styles.container, styles[`marker${num}`]].join(" ")}>
      <span className={styles.time}>{value}</span>
    </div>
  );
}
