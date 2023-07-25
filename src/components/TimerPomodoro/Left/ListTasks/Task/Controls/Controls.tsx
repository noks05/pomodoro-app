import React, { useState } from "react";
import { Setting } from "../../../../../img/Setting";
import { Dropdown } from "../../Dropdown/Dropdown";
import { IControlsProps } from "../../../../../../interface";
import { ControlsList } from "./ControlsList";
import styles from "./controls.module.css";

export function Controls({
  idTask,
  setTasks,
  tasks,
  setIsDeleteConfirm,
  refTask,
}: IControlsProps) {
  let [coordinates, setСoordinates] = useState({ top: 0, left: 0 });

  function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    let x = 0;
    let y = 0;
    const rect = e.currentTarget.getBoundingClientRect();
    x =
      rect.left +
      rect.width / 2 +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    y =
      rect.top +
      rect.height +
      20 +
      document.body.scrollTop +
      document.documentElement.scrollTop;

    setСoordinates({ top: y, left: x });
  }

  return (
    <div className={styles.wrapDropdown} onClick={e => handleClick(e)}>
      <Dropdown
        button={
          <button className={styles.button} type="button">
            <Setting />
          </button>
        }
      >
        <ControlsList
          coordinates={coordinates}
          setIsDeleteConfirm={setIsDeleteConfirm}
          idTask={idTask}
          setTasks={setTasks}
          tasks={tasks}
          refTask={refTask}
        />
      </Dropdown>
    </div>
  );
}
