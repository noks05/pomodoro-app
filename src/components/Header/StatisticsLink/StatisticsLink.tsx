import React from "react";
import { Diagram } from "../../img/Diagram";
import { Link } from "react-router-dom";
import styles from "./statisticslink.module.css";

export function StatisticsLink() {
  return (
    <Link to="/statisticPomodoro" className="flex align-center">
      <Diagram />
      <div className={styles.text}>Статистика</div>
    </Link>
  );
}
