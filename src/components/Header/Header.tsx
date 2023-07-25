import React from "react";
import { Logo } from "./Logo/Logo";
import { StatisticsLink } from "./StatisticsLink/StatisticsLink";
import { Container } from "../Container";
import styles from "./header.module.css";
import { DarkModeSwitch } from "./DarkModeSwitch";

export function Header() {
  return (
    <div className={styles.header}>
      <Container localStyle={["flex", "justify-between", "align-center"]}>
        <Logo />
        <DarkModeSwitch />
        <StatisticsLink />
      </Container>
    </div>
  );
}
