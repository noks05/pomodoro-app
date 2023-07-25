import React from "react";
import { NumberDataBlock } from "./NumberDataBlock";
import { IStatisticDayData } from "../../../interface";
import styles from "./bottom.css";

export function Bottom({ dataToday }: { dataToday?: IStatisticDayData }) {
  return (
    <div className="flex">
      <NumberDataBlock title="Фокус" dataDay={dataToday} stylesBox="boxFocus" />
      <NumberDataBlock
        title="Время на паузе"
        dataDay={dataToday}
        stylesBox="boxPause"
      />
      <NumberDataBlock
        title="Остановки"
        dataDay={dataToday}
        stylesBox="boxStop"
      />
    </div>
  );
}
