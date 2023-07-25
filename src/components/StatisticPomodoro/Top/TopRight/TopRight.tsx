import React from "react";
import { DiagramBlock } from "./DiagramBlock";
import { DaysWeek } from "./DaysWeek";
import styles from "./topright.module.css";

export function TopRight() {
  return (
    <div className={["flex", "flex-column", styles.container].join(" ")}>
      <DiagramBlock />
      <DaysWeek />
    </div>
  );
}
