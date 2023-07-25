import React from "react";
import { ModalGeneric } from "../../../ModalGeneric/ModalGeneric";
import styles from "./alerttimer.module.css";

export function AlertTimer({
  setIsTomatoOff,
  clicksBtns,
  statusTimer,
}: {
  clicksBtns: { onClickPomodoro: () => void; onClickBreak: () => void };
  setIsTomatoOff: (el: boolean) => void;
  statusTimer: string | null;
}) {
  const dataText = {
    title: "Помидорка закончилась, хотите уйти на перерыв?",
    btnTopText: "Да",
    btnBottomText: "Отмена",
  };
  let handleClick = clicksBtns.onClickPomodoro;

  if (statusTimer === "break-started") {
    handleClick = clicksBtns.onClickBreak;
    dataText.title = `Перерыв закончился. Начать следующую помидорку?`;
  }

  function onCloseWindow() {
    setIsTomatoOff(false);
  }
  return (
    <ModalGeneric
      data={dataText}
      classes={{
        classBtnTop: "btn-green",
      }}
      handleBtnAgree={handleClick}
      onCloseModal={onCloseWindow}
    />
  );
}
