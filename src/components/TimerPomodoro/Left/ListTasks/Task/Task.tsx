import React, { useRef } from "react";
import { Controls } from "./Controls/Controls";
import { changedLocalData } from "../../../../../utils/glopFunction";
import { useStoreActions, useStoreState } from "easy-peasy";
import { IStorePomodoroBox, ITaskProps } from "../../../../../interface";
import styles from "./task.module.css";

export function Task({ task, tasksData, setTasks }: ITaskProps) {
  const refTask = useRef(null);
  const keyTasks = useStoreState<IStorePomodoroBox>(
    state => state.keyLocalStorageTasks
  );
  const status = useStoreState<IStorePomodoroBox>(state => state.status);
  const setIsDeleteConfirm = useStoreActions<IStorePomodoroBox>(
    state => state.setIsDeleteConfirm
  );
  const setIdTask = useStoreActions<IStorePomodoroBox>(
    state => state.setIdTask
  );

  function onClick() {
    if (status === "") {
      setIdTask(task.id);
    }
  }

  function editNameTask(oldName: string, newName: string) {
    const newTasks = tasksData.map(obj => {
      if (obj.name === oldName) {
        obj.name = newName;
      }
      return obj;
    });
    return newTasks;
  }

  function handleEdit(e: React.FormEvent<HTMLFormElement>, taskName: string) {
    e.preventDefault();
    // @ts-ignore
    const changedNameTask = e.target[0].value.trim();
    const repeatName = tasksData.find(
      obj => obj.name === changedNameTask && obj.id !== task.id
    );

    if (!repeatName && changedNameTask) {
      // @ts-ignore
      refTask.current?.classList.remove("edit");

      const newTasks = editNameTask(taskName, changedNameTask);
      changedLocalData(keyTasks, setTasks, newTasks);
    } else {
      console.log(
        "Название задачи не должно быть пустым или совпадать с названиями других задач"
      );
    }
  }

  return (
    <li
      className={[
        styles.task,
        "flex",
        "align-center",
        "justify-between",
        "animate__animated",
        "animate__fadeInLeft",
      ].join(" ")}
      ref={refTask}
      id={task.id}
    >
      <button
        className={[styles.textWrap, "flex", "align-center"].join(" ")}
        type="button"
        onClick={() => {
          onClick();
        }}
      >
        <span className={[styles.number, "flex-center-center"].join(" ")}>
          {task.number}
        </span>
        <span className={styles.text}>{task.name}</span>
      </button>

      <form className={styles.form} onSubmit={e => handleEdit(e, task.name)}>
        <input
          className={styles.taskInput}
          type="text"
          defaultValue={task.name}
        />
        <button className={styles.taskBtn} type="submit">
          изменить
        </button>
      </form>

      <Controls
        setIsDeleteConfirm={setIsDeleteConfirm}
        idTask={task.id}
        setTasks={setTasks}
        tasks={tasksData}
        refTask={refTask}
      />
    </li>
  );
}
