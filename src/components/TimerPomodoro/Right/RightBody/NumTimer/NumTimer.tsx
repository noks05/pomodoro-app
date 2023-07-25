import React from "react";
import { getTimeOfSeconds } from "../../../../../utils/glopFunction";
import styles from "./numtimer.module.css";

export function NumTimer({ defaultSeconds }: { defaultSeconds: number }) {
  const time = getTimeOfSeconds(defaultSeconds);
  const min = time.allMin;
  const sec = time.lastSeconds;

  return (
    <div className={["flex", styles.wrap].join(" ")}>
      <div className={styles.min}>{min < 10 ? `0${min}` : min}</div>
      <div className={styles.sec}>{sec < 10 ? `0${sec}` : sec}</div>
    </div>
  );
}
