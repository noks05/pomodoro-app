import React from "react";
import { TDataBtn } from "../../../../../interface";
import styles from "./btntimer.module.css";

export function BtnTimer({
  btnData,
  styles,
}: {
  btnData: TDataBtn;
  styles: string;
}) {
  return (
    <button className={styles} type="button" onClick={() => btnData.onClick()}>
      {btnData.text}
    </button>
  );
}
