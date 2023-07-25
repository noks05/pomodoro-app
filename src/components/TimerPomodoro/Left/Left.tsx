import React from "react";
import { Instruction } from "./Instruction/Instruction";
import { AddTask } from "./AddTask/AddTask";
import { ListTasks } from "./ListTasks/ListTasks";
import { useStoreActions, useStoreState } from "easy-peasy";
import { IStorePomodoroBox } from "../../../interface";
import styles from "./left.module.css";

export function Left() {
  const tasks = useStoreState<IStorePomodoroBox>(state => state.tasks);
  const setTasks = useStoreActions<IStorePomodoroBox>(state => state.setTasks);

  return (
    <div className={styles.left}>
      <h2 className={styles.title}>Ура! Теперь можно начать работать:</h2>

      <Instruction />
      <AddTask setTasks={setTasks} tasks={tasks} />
      <ListTasks setTasks={setTasks} tasks={tasks} />
    </div>
  );
}
