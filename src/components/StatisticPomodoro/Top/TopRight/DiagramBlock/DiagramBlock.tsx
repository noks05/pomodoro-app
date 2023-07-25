import React from "react";
import { Marker } from "./Marker";
import { generateRandomString } from "../../../../../utils/generateRandomString";
import { Columns } from "./Columns";
import { useStoreState } from "easy-peasy";
import { IStorePomodoroBox } from "../../../../../interface";
import styles from "./diagramblock.module.css";

export function DiagramBlock() {
  const numMarkers = [1, 2, 3, 4];
  const defaultSeconds = useStoreState<IStorePomodoroBox>(
    state => state.defaultSeconds
  );

  return (
    <div className={styles.container}>
      {numMarkers.map(num => (
        <Marker
          key={generateRandomString()}
          num={num}
          defaultSeconds={defaultSeconds.timeWork}
        />
      ))}
      <Columns />
    </div>
  );
}
