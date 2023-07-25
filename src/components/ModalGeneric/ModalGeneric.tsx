import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { Close } from "../img/Close";
import { IModalGenericProps } from "../../interface";
import styles from "./modalgeneric.module.css";

export function ModalGeneric({
  data,
  classes,
  handleBtnAgree,
  onCloseModal,
  children,
}: IModalGenericProps) {
  const refModal = useRef(null);

  function exitAnimatedModal() {
    // @ts-ignore
    refModal?.current?.parentElement.classList.add("animate__fadeOut");
    // @ts-ignore
    refModal?.current?.classList.add(styles.animateOut);
  }

  function handleClickInside(target: EventTarget) {
    const classesStrings = [
      '[class*="_btnClose__"]',
      '[class*="_btnCancel__"]',
      `[class*="_btnOk__"]`,
    ];

    classesStrings.forEach(str => {
      const click = (target as HTMLElement).closest(str);
      if (click) {
        exitAnimatedModal();
        setTimeout(onCloseModal, 1000);
      }
    });
  }

  function onClose(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ref: React.MutableRefObject<null>
  ) {
    const target = e.target;
    // @ts-ignore
    const clickInsideModal = ref.current.contains(target);

    if (clickInsideModal) {
      handleClickInside(target);
    } else {
      exitAnimatedModal();
      setTimeout(onCloseModal, 1000);
    }
  }

  if (typeof window === "undefined") return null;
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className={[styles.wrap, "animate__animated", "animate__fadeIn"].join(
        " "
      )}
      onClick={e => onClose(e, refModal)}
    >
      <div
        className={[styles.box, "flex-center-center", "flex-column"].join(" ")}
        ref={refModal}
      >
        <button className={[styles.btnClose, "flex"].join(" ")} type="button">
          <Close />
        </button>

        <h3 className={styles.title}>{data.title}</h3>

        {children && <div className={styles.content}>{children}</div>}

        <div className="flex">
          <button
            className={[styles.btnOk, classes?.classBtnTop, "flex"].join(" ")}
            // @ts-ignore
            type={data.btnType ? data.btnType : "button"}
            onClick={e => handleBtnAgree(e)}
            form={data.btnForm ? data.btnForm : ""}
          >
            {data.btnTopText}
          </button>

          <button
            className={[styles.btnCancel, classes?.classBtnBottom, "flex"].join(
              " "
            )}
            type="button"
          >
            {data.btnBottomText}
          </button>
        </div>
      </div>
    </div>,
    portalRoot
  );
}
