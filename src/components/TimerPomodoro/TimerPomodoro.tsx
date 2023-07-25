import React from "react";
import { Left } from "./Left";
import { Right } from "./Right";
import styles from "./timerpomodoro.module.css";

export function TimerPomodoro() {
  return (
    <div className={["flex", "justify-between", styles.wrapper].join(" ")}>
      <h1 className="visually-hidden">Интерфейс приложения Помодоро</h1>
      <Left />
      <Right />
    </div>
  );
}
