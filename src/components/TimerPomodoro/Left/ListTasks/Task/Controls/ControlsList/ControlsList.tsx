import React from "react";
import ReactDOM from "react-dom";
import { generateId } from "../../../../../../../utils/generateRandomString";
import { changedLocalData } from "../../../../../../../utils/glopFunction";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  IControlsProps,
  IStorePomodoroBox,
} from "../../../../../../../interface";
import styles from "./controlslist.module.css";

export function ControlsList({
  coordinates,
  idTask,
  setTasks,
  tasks,
  setIsDeleteConfirm,
  refTask,
}: IControlsProps) {
  const setRefTask = useStoreActions<IStorePomodoroBox>(
    state => state.setRefTask
  );
  const keyTasks = useStoreState<IStorePomodoroBox>(
    state => state.keyLocalStorageTasks
  );
  const setIdTask = useStoreActions<IStorePomodoroBox>(
    state => state.setIdTask
  );
  const setNumber = useStoreActions<IStorePomodoroBox>(
    state => state.setNumber
  );

  if (typeof window === "undefined") return null;
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  const positionDropdown = {
    top: coordinates?.top,
    left: coordinates?.left,
  };

  const data = [
    {
      name: "Увеличить",
      classIcon: styles.iconPlus,
      onClick: () => {
        const newTasks = tasks.map(obj => {
          if (obj.id === idTask) {
            setNumber((obj.number += 1));
          }
          return obj;
        });
        changedLocalData(keyTasks, setTasks, newTasks);
      },
    },
    {
      name: "Уменьшить",
      classIcon: styles.iconMinus,
      onClick: () => {
        tasks.map(obj => {
          if (obj.id === idTask) {
            if (obj.number > 1) {
              setNumber((obj.number -= 1));
            }
          } else {
            setIdTask(idTask);
            setIsDeleteConfirm(true);
          }
        });
      },
    },
    {
      name: "Редактировать",
      classIcon: styles.iconEdit,
      onClick: () => {
        refTask.current?.classList.add("edit");
      },
    },
    {
      name: "Удалить",
      classIcon: styles.iconDelete,
      onClick: () => {
        setIdTask(idTask);
        setIsDeleteConfirm(true);
        setRefTask(refTask);
      },
    },
  ].map(obj => generateId(obj));

  return ReactDOM.createPortal(
    <ul className={styles.controls} style={positionDropdown}>
      {data.map(obj => (
        <li key={obj.id}>
          <button
            className={[styles.item, "flex", "align-center"].join(" ")}
            type="button"
            onClick={e => obj.onClick()}
          >
            <span
              className={[styles.icon, obj.classIcon, "flex"].join(" ")}
            ></span>

            {obj.name}
          </button>
        </li>
      ))}
    </ul>,
    portalRoot
  );
}
