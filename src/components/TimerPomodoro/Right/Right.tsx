import React, { useEffect } from "react";
import { RightHeader } from "./RightHeader";
import { RightBody } from "./RightBody";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  IStatisticDayData,
  IStorePomodoroBox,
  ITaskData,
} from "../../../interface";
import { setDataStatistic } from "../../../utils/statisticData";
import { getTimeData } from "../../../utils/glopFunction";
import { AlertTimer } from "./AlertTimer";
import { ChangeTimer } from "./ChangeTimer";
import ReactHowler from "react-howler";
import sound from "../../../audio/sound1.mp3";
import styles from "./right.module.css";

export function Right() {
  const keyLSStatistic = useStoreState<IStorePomodoroBox>(
    state => state.keyLocalStorageStatistic
  );
  const defaultSeconds = useStoreState<IStorePomodoroBox>(
    state => state.defaultSeconds
  );
  const dataForWeek = useStoreState<IStorePomodoroBox>(
    state => state.statisticWeekData
  );
  const dayNum = useStoreState<IStorePomodoroBox>(state => state.numDay);
  const tasks = useStoreState<IStorePomodoroBox>(state => state.tasks);
  const idCurrentTask = useStoreState<IStorePomodoroBox>(state => state.idTask);
  const isChangeTimer = useStoreState<IStorePomodoroBox>(
    state => state.isChangeTimer
  );
  const isTomatoOff = useStoreState<IStorePomodoroBox>(
    state => state.isTomatoOff
  );
  const setIsTomatoOff = useStoreActions<IStorePomodoroBox>(
    state => state.setIsTomatoOff
  );
  const setSeconds = useStoreActions<IStorePomodoroBox>(
    state => state.setSeconds
  );
  const setStatus = useStoreActions<IStorePomodoroBox>(
    state => state.setStatus
  );
  const setPomodoroCount = useStoreActions<IStorePomodoroBox>(
    state => state.setPomodoroCount
  );
  const timeoutId = useStoreState<IStorePomodoroBox>(state => state.timeoutId);
  const setTimeoutId = useStoreActions<IStorePomodoroBox>(
    state => state.setTimeoutId
  );
  const setTimerActive = useStoreActions<IStorePomodoroBox>(
    state => state.setTimerActive
  );
  const setNumber = useStoreActions<IStorePomodoroBox>(
    state => state.setNumber
  );
  const setIsDeleteConfirm = useStoreActions<IStorePomodoroBox>(
    state => state.setIsDeleteConfirm
  );
  const isMuteAlert = useStoreState<IStorePomodoroBox>(
    state => state.isMuteAlert
  );

  let seconds = 0;
  let number = 0;
  let timerActive = false;
  let curTask: any = null;
  let status = "";

  if (tasks.length) {
    curTask = tasks.find((obj: ITaskData) => obj.id === idCurrentTask);

    if (!curTask) curTask = tasks[0];
  }

  if (curTask) {
    seconds = curTask.status === "" ? defaultSeconds.timeWork : curTask.seconds;
    number = curTask.number;
    timerActive = curTask.timerActive;
    status = curTask.status;
  }

  let styleColor = "";
  switch (status) {
    case "":
      break;
    case "started":
      styleColor = "work";
      break;
    case "paused":
      styleColor = "pause";
      break;
    case "break-started":
      styleColor = "break-work";
      break;
    case "break-paused":
      styleColor = "break-pause";
      break;
  }

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      const newTimeoutId = setTimeout(
        () => setSeconds(Number(seconds) - 1),
        1000
      );
      setTimeoutId(newTimeoutId);
    } else if (seconds === 0 && timerActive) {
      setTimerActive(false);
      setIsTomatoOff(true);

      if (status === "break-started") {
        const btnPause = document.querySelector(
          '[class^="rightbody_btnStart__"]'
        );
        btnPause?.classList.add("disabled");
      }
    }
  }, [
    seconds,
    timerActive,
    setSeconds,
    setTimeoutId,
    setTimerActive,
    status,
    setIsTomatoOff,
  ]);

  function createBtnData(
    text: string,
    stateStatus: string | null = null,
    stateTimerActive: boolean | null = null,
    defaultSec: number | null = null,
    code = () => {}
  ) {
    return {
      text: text,
      onClick: () => {
        stateStatus !== null && setStatus(stateStatus);
        stateTimerActive !== null && setTimerActive(stateTimerActive);
        defaultSec !== null && setSeconds(defaultSec);

        switch (text) {
          case "Стоп":
            clearTimeout(timeoutId);

            break;
          case "Пауза":
            setDataStatistic(keyLSStatistic, {
              startPause: getTimeData(true).seconds,
              stop: 1,
            });
            clearTimeout(timeoutId);

            break;
          case "Продолжить":
            if (dataForWeek.length) {
              const lastDataDay: IStatisticDayData =
                dataForWeek[dataForWeek.length - 1];

              lastDataDay.day === dayNum &&
                setDataStatistic(keyLSStatistic, {
                  pause: getTimeData(true).seconds,
                });
            }
            clearTimeout(timeoutId);

            break;
          case "Пропустить":
            clearTimeout(timeoutId);

            if (status === "break-started") {
              const btnPause = document.querySelector(
                '[class^="rightbody_btnStart__"]'
              );
              btnPause?.classList.remove("disabled");
              setIsTomatoOff(false);
            }

            setIsTomatoOff(false);

            break;
          case "Заново":
            setIsTomatoOff(false);
            break;
          case "Сделано":
            setDataStatistic(keyLSStatistic, {
              work: defaultSeconds.timeWork - seconds,
              pomodoro: 1,
            });
            setIsTomatoOff(false);
            setPomodoroCount(curTask.pomodoroCount + 1);
            break;
        }
        code();
      },
    };
  }

  function incrementNumberTask() {
    if (number > 1) {
      setNumber(number - 1);
    }
  }

  let breakSeconds = defaultSeconds.shortBreak;
  if (curTask) {
    breakSeconds =
      curTask.pomodoroCount === 3
        ? defaultSeconds.bigBreak
        : defaultSeconds.shortBreak;
  }

  const propsBtnDone = [
    "Сделано",
    number > 1 ? "break-started" : "",
    number > 1 ? true : false,
    number > 1 ? breakSeconds : defaultSeconds.timeWork,
    () => {
      incrementNumberTask();
      if (number < 2) {
        setIsDeleteConfirm(true);
      }
    },
  ];

  const dataBtns = {
    "": {
      btnOne: createBtnData("Старт", "started", true),
      btnTwo: createBtnData("Стоп", null, null, defaultSeconds.timeWork),
    },
    started: {
      btnOne: createBtnData("Пауза", "paused", false),
      btnTwo: createBtnData("Стоп", "", false, defaultSeconds.timeWork),
    },
    startedEnd: {
      btnOne: createBtnData("Заново", "", null, defaultSeconds.timeWork),
      btnTwo: createBtnData(
        propsBtnDone[0],
        propsBtnDone[1],
        propsBtnDone[2],
        propsBtnDone[3],
        propsBtnDone[4]
      ),
    },
    paused: {
      btnOne: createBtnData("Продолжить", "started", true),
      btnTwo: createBtnData(
        propsBtnDone[0],
        propsBtnDone[1],
        propsBtnDone[2],
        propsBtnDone[3],
        propsBtnDone[4]
      ),
    },
    breakStarted: {
      btnOne: createBtnData("Пауза", "break-paused", false),
      btnTwo: createBtnData("Пропустить", "", false, defaultSeconds.timeWork),
    },
    breakPaused: {
      btnOne: createBtnData("Продолжить", "break-started", true),
      btnTwo: createBtnData("Пропустить", "", false, defaultSeconds.timeWork),
    },
  };

  const stateAlert = !isMuteAlert && isTomatoOff;

  return (
    <>
      <div className={[styles.right, styleColor].join(" ")}>
        <RightHeader task={curTask} />
        <RightBody
          task={curTask}
          dataBtns={dataBtns}
          status={status}
          seconds={seconds}
          statusMute={isMuteAlert}
        />
      </div>

      <ReactHowler
        src={sound}
        playing={stateAlert}
        volume={0.1}
        loop={true}
        mute={isMuteAlert}
      />

      {stateAlert && (
        <AlertTimer
          statusTimer={status}
          setIsTomatoOff={setIsTomatoOff}
          clicksBtns={{
            onClickPomodoro: dataBtns.startedEnd.btnTwo.onClick,
            onClickBreak: dataBtns.breakStarted.btnTwo.onClick,
          }}
        />
      )}
      {isChangeTimer && <ChangeTimer />}
    </>
  );
}
