import React from "react";
import { ITaskData } from "../../../../interface";
import styles from "./rightheader.module.css";

export function RightHeader({ task }: { task: ITaskData }) {
  const stylesHeader = [
    styles.header,
    "flex",
    "justify-between",
    "align-center",
  ]
    .filter(str => str !== "")
    .join(" ");

  return (
    <div className={stylesHeader}>
      <h3 className={styles.title}>
        {task ? task.name : "Задача не добавлена"}
      </h3>

      <div className={[styles.tomatoCount, "flex"].join(" ")}>
        {task ? `Помидор ${task.number}` : ""}
      </div>
    </div>
  );
}
