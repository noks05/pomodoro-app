import React from "react";
import { changedLocalData } from "../../../utils/glopFunction";
import { useStoreActions, useStoreState } from "easy-peasy";
import { IStorePomodoroBox } from "../../../interface";
import styles from "./darkmodeswitch.module.css";

export function DarkModeSwitch() {
  const isDarkMode = useStoreState<IStorePomodoroBox>(
    state => state.isDarkMode
  );
  const setIsDarkMode = useStoreActions<IStorePomodoroBox>(
    state => state.setIsDarkMode
  );
  const keyLSDarkMode = useStoreState<IStorePomodoroBox>(
    state => state.keyLocalStorageDarkMode
  );

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    document.body.classList.toggle("dark-mode");
    changedLocalData(keyLSDarkMode, setIsDarkMode, !isDarkMode);
  }

  return (
    <button
      className={styles.darkMode}
      type="button"
      onClick={e => handleClick(e)}
    >
      <p className={[styles.day, "flex", "align-center"].join(" ")}>
        <span>Светлая тема</span>
        <span
          className={[styles.icon, "flex-center-center", "icon-light-up"].join(
            " "
          )}
        ></span>
        <span
          className={[styles.icon, "flex-center-center", "icon-moon"].join(" ")}
        ></span>
      </p>

      <p className={styles.night}>
        <span>Тёмная тема</span>
      </p>
    </button>
  );
}
