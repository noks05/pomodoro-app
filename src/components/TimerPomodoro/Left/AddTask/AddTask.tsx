import React, { ChangeEvent, FormEvent } from "react";
import { generateRandomString } from "../../../../utils/generateRandomString";
import { changedLocalData } from "../../../../utils/glopFunction";
import { useStoreActions, useStoreState } from "easy-peasy";
import { IStorePomodoroBox, ITaskData } from "../../../../interface";
import styles from "./addtask.module.css";

export function AddTask({
  setTasks,
  tasks,
}: {
  setTasks: (data: ITaskData) => void;
  tasks: ITaskData[];
}) {
  const setIdTask = useStoreActions<IStorePomodoroBox>(
    state => state.setIdTask
  );
  const defaultSeconds = useStoreState<IStorePomodoroBox>(
    state => state.defaultSeconds
  );
  const keyTasks = useStoreState<IStorePomodoroBox>(
    state => state.keyLocalStorageTasks
  );

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim()) {
      e.target.classList.add("active");
    } else {
      e.target.classList.remove("active");
    }
  }

  function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // @ts-ignore
    const inputValue = (e.target as HTMLFormElement)[0].value.trim();
    if (inputValue === "") return console.log("Поле не может быть пустым");
    const exists = tasks.find(
      (obj: { name: string }) => obj.name === inputValue
    );
    if (exists) return console.log("Задача с таким названием уже существует");

    const newTasks = [
      ...tasks,
      {
        // @ts-ignore
        name: (e.target as HTMLFormElement)[0].value,
        number: 1,
        pomodoroCount: 0,
        id: generateRandomString(),
        seconds: defaultSeconds.timeWork,
        status: "",
        timerActive: false,
      },
    ];
    changedLocalData(keyTasks, setTasks, newTasks);
    newTasks.length === 1 && setIdTask(newTasks[0].id);
  }

  return (
    <form
      className={styles.addTaskForm}
      action=""
      autoComplete="on"
      onSubmit={e => addTask(e)}
    >
      <label className={styles.addInput}>
        <input
          type="text"
          name="name-task"
          id="add-task-form"
          onChange={e => handleInput(e)}
        />
        <span>Название задачи</span>
      </label>

      <button className="btn-green" type="submit">
        Добавить
      </button>
    </form>
  );
}
