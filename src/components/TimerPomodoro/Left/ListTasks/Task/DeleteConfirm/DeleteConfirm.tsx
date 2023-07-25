import React from "react";
import { changedLocalData } from "../../../../../../utils/glopFunction";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  IDeleteConfirmProps,
  IStorePomodoroBox,
} from "../../../../../../interface";
import styles from "./deleteconfirm.module.css";
import { ModalGeneric } from "../../../../../ModalGeneric/ModalGeneric";

export function DeleteConfirm({ tasksData, setTasks }: IDeleteConfirmProps) {
  const timeoutId = useStoreState<IStorePomodoroBox>(state => state.timeoutId);
  const keyTasks = useStoreState<IStorePomodoroBox>(
    state => state.keyLocalStorageTasks
  );
  const setIsDeleteConfirm = useStoreActions<IStorePomodoroBox>(
    state => state.setIsDeleteConfirm
  );
  const idTask = useStoreState<IStorePomodoroBox>(state => state.idTask);

  function onDelete() {
    clearTimeout(timeoutId);

    const findTask = document.getElementById(idTask);
    findTask?.classList.add("animate__fadeOutLeft");

    setTimeout(() => {
      const newTasks = tasksData.filter(obj => obj.id !== idTask);
      changedLocalData(keyTasks, setTasks, newTasks);
    }, 1000);
  }

  return (
    <ModalGeneric
      data={{
        title: "Удалить задачу?",
        btnTopText: "Удалить",
        btnBottomText: "Отмена",
      }}
      classes={{
        classBtnTop: styles.btnDelete,
        classBtnBottom: styles.btnCancel,
        classBtnClose: styles.btnClose,
      }}
      handleBtnAgree={onDelete}
      onCloseModal={() => setIsDeleteConfirm(false)}
    />
  );
}
