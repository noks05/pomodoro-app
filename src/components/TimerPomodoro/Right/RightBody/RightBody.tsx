import React from "react";
import { Plus } from "../../../img/Plus";
import { NumTimer } from "./NumTimer/NumTimer";
import { BtnTimer } from "./BtnTimer/BtnTimer";
import { IRightBodyProps, IStorePomodoroBox } from "../../../../interface";
import { useStoreActions } from "easy-peasy";
import styles from "./rightbody.module.css";

export function RightBody({
  task,
  dataBtns,
  seconds,
  status,
  statusMute,
}: IRightBodyProps) {
  const setIsChangeTimer = useStoreActions<IStorePomodoroBox>(
    state => state.setIsChangeTimer
  );
  const setIsMuteAlert = useStoreActions<IStorePomodoroBox>(
    state => state.setIsMuteAlert
  );

  function createCLassisString(arrClassis: string[]) {
    return arrClassis.filter(str => str !== "").join(" ");
  }

  const stylesBtnStop = createCLassisString([
    styles.btnStop,
    task && status !== "" ? "" : "disabled",
  ]);

  const stylesBtnStart = createCLassisString([
    styles.btnStart,
    "btn-green",
    task ? "" : "disabled",
  ]);

  function getDataBtns(state: string) {
    switch (state) {
      case "":
        return dataBtns[""];
      case "started":
        return seconds <= 0 ? dataBtns.startedEnd : dataBtns.started;
      case "paused":
        return dataBtns.paused;
      case "break-started":
        return dataBtns.breakStarted;
      case "break-paused":
        return dataBtns.breakPaused;
      default:
        return dataBtns[""];
    }
  }
  const contentBtns = getDataBtns(status);
  const btnOne = contentBtns.btnOne;
  const btnTwo = contentBtns.btnTwo;

  return (
    <div
      className={[styles.body, "flex", "align-center", "flex-column"].join(" ")}
    >
      <button
        className={[
          styles.btnMute,
          "flex-center-center",
          statusMute ? "active" : "",
        ].join(" ")}
        type="button"
        onClick={() => setIsMuteAlert()}
      >
        <span className="icon-bell-1"></span>
        <span className="icon-bell-off-empty"></span>
      </button>

      <div className={styles.timer}>
        <NumTimer defaultSeconds={task ? seconds : 0} />

        <button
          className={[styles.plus, "flex"].join(" ")}
          onClick={() => setIsChangeTimer(true)}
        >
          <Plus />
        </button>
      </div>

      <div className={styles.task}>
        {task ? (
          <>
            <span>Задача - </span>
            {task.name}
          </>
        ) : (
          "Задача не добавлена"
        )}
      </div>

      <div className="flex">
        {btnOne && <BtnTimer btnData={btnOne} styles={stylesBtnStart} />}

        {btnTwo && <BtnTimer btnData={btnTwo} styles={stylesBtnStop} />}
      </div>
    </div>
  );
}
