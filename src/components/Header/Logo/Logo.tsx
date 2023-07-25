import React from "react";
import { Tomato } from "../../img/Tomato";
import { Link } from "react-router-dom";
import styles from "./logo.module.css";

export function Logo() {
  return (
    <Link to="/timerPomodoro" className="flex align-center">
      <Tomato />
      <div className={styles.text}>pomodoro_box</div>
    </Link>
  );
}
