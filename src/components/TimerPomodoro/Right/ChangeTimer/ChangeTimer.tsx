import React, { useEffect } from "react";
import { ModalGeneric } from "../../../ModalGeneric/ModalGeneric";
import { useStoreActions, useStoreState } from "easy-peasy";
import { IStorePomodoroBox } from "../../../../interface";
import styles from "./changetimer.module.css";
import {
  changedLocalData,
  getTimeOfSeconds,
} from "../../../../utils/glopFunction";

export function ChangeTimer() {
  const tasks = useStoreState<IStorePomodoroBox>(state => state.tasks);
  const setTasks = useStoreActions<IStorePomodoroBox>(state => state.setTasks);
  const keyLocalStorageTasks = useStoreState<IStorePomodoroBox>(
    state => state.keyLocalStorageTasks
  );
  const keyChangeTimer = useStoreState<IStorePomodoroBox>(
    state => state.keyLocalStorageChangeTimer
  );
  const defaultSeconds = useStoreState<IStorePomodoroBox>(
    state => state.defaultSeconds
  );
  const setDefaultSeconds = useStoreActions<IStorePomodoroBox>(
    state => state.setDefaultSeconds
  );
  const setIsChangeTimer = useStoreActions<IStorePomodoroBox>(
    state => state.setIsChangeTimer
  );

  const dataText = {
    title: "Настройка таймера",
    btnTopText: "Готово",
    btnBottomText: "Отмена",
    btnType: "submit",
    btnForm: "change-timer-time",
  };

  function onCloseModal() {
    setIsChangeTimer(false);
  }

  const minWork = 25;
  const minShortBreak = 5;
  const minBigBreak = 15;

  const maxWork = 60;
  const maxShortBreak = 10;
  const maxBigBreak = 30;

  let work;
  let shortBreak;
  let bigBreak;

  if (defaultSeconds) {
    work = getTimeOfSeconds(defaultSeconds.timeWork).allMin;
    shortBreak = getTimeOfSeconds(defaultSeconds.break).allMin;
    bigBreak = getTimeOfSeconds(defaultSeconds.bigBreak).allMin;
  }

  function getNumbersFromStr(elem: HTMLInputElement) {
    const str = elem.value.replace(/\D/g, "");
    return str;
  }

  function checkedNumber(inputValue: string, min: number, max: number) {
    const response = Number(inputValue) >= min && Number(inputValue) <= max;
    return response;
  }

  useEffect(() => {
    document
      .getElementById("change-timer-time")
      ?.addEventListener("input", event => {
        const target = event.target;
        // @ts-ignore
        const str = getNumbersFromStr(target);
        const numberStr = str.slice(0, 2);
        // @ts-ignore
        const check = checkedNumber(numberStr, target.min, target.max);
        if (check) {
          // @ts-ignore
          target.value = numberStr;
        } else {
          // @ts-ignore
          target.value = target.min;
        }
      });
  }, []);

  function onSubmit(e: any) {
    e.preventDefault();
    const target = e.target;

    const workValue = getNumbersFromStr(target["work"]);
    const bigWorkValue = getNumbersFromStr(target["big-break"]);
    const shortWorkValue = getNumbersFromStr(target["short-break"]);

    const newData = {
      timeWork: Number(workValue) * 60,
      shortBreak: Number(shortWorkValue) * 60,
      bigBreak: Number(bigWorkValue) * 60,
    };

    changedLocalData(keyChangeTimer, setDefaultSeconds, newData);
    const newTasks = tasks.map((obj: any) => {
      return {
        ...obj,
        seconds: Number(workValue) * 60,
      };
    });
    changedLocalData(keyLocalStorageTasks, setTasks, newTasks);
  }

  return (
    <ModalGeneric
      data={dataText}
      classes={{
        classBtnTop: "btn-green",
      }}
      handleBtnAgree={e => {}}
      onCloseModal={onCloseModal}
    >
      <form
        className={styles.form}
        id="change-timer-time"
        onSubmit={e => onSubmit(e)}
      >
        <label className={styles.formItem}>
          <span>«Помидор»</span>
          <input
            className={styles.input}
            name="work"
            type="number"
            min={minWork}
            max={maxWork}
            defaultValue={work ? work : minWork}
          />
        </label>

        <label className={styles.formItem}>
          <span>Короткий перерыв</span>
          <input
            className={styles.input}
            name="short-break"
            type="number"
            min={minShortBreak}
            max={maxShortBreak}
            defaultValue={shortBreak ? shortBreak : minShortBreak}
          />
        </label>

        <label className={styles.formItem}>
          <span>Длинный перерыв</span>
          <input
            className={styles.input}
            name="big-break"
            type="number"
            min={minBigBreak}
            max={maxBigBreak}
            defaultValue={bigBreak ? bigBreak : minBigBreak}
          />
        </label>

        <label className={styles.formItem}>
          <span>Длинный перерыв</span>
          <input
            className={styles.input}
            name="big-break"
            type="number"
            min={minBigBreak}
            max={maxBigBreak}
            defaultValue={bigBreak ? bigBreak : minBigBreak}
          />
        </label>
      </form>
    </ModalGeneric>
  );
}
