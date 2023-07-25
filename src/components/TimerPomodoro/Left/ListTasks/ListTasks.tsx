import React from "react";
import { Task } from "./Task/Task";
import { IStorePomodoroBox, ITaskData } from "../../../../interface";
import { getTimeOfSeconds } from "../../../../utils/glopFunction";
import { useStoreState } from "easy-peasy";
import { DeleteConfirm } from "./Task/DeleteConfirm";
import styles from "./listtasks.module.css";

export function ListTasks({
  tasks,
  setTasks,
}: {
  tasks: ITaskData[];
  setTasks: (data: ITaskData[]) => void;
}) {
  const isDeleteConfirm = useStoreState<IStorePomodoroBox>(
    state => state.isDeleteConfirm
  );
  if (!tasks.length) return null;

  const seconds = tasks.reduce((accum: number, item: ITaskData) => {
    return (accum += Number(item.number) * Number(item.seconds));
  }, 0);
  const time = getTimeOfSeconds(seconds);

  let ending = "";
  if (time.hour > 1) {
    ending = time.hour <= 4 ? "а" : "ов";
  }
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {tasks.map((obj: ITaskData) => (
          <Task task={obj} tasksData={tasks} setTasks={setTasks} key={obj.id} />
        ))}
      </ul>

      <div className={styles.time}>
        {time.hour !== 0 && `${time.hour} час${ending}`}{" "}
        {time.min !== 0 && `${time.min} мин`}
      </div>

      {isDeleteConfirm && (
        <DeleteConfirm tasksData={tasks} setTasks={setTasks} />
      )}
    </div>
  );
}
