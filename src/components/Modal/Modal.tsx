import { FC, useEffect } from "react";
import { CloseBtn } from "./CloseBtn";
import { ModalProps } from "./helper";
import classes from "./Modal.module.scss";

const Modal: FC<ModalProps> = ({
  content,
  title,
  visible,
  setVisible,
}) => {
  const rootClasses: string[] = [classes.modal, visible ? classes.active : ""];
  useEffect(() => {
    const hendleKeyUP = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("Escape key pressed");
        setVisible(false);
      }
    }
    document.addEventListener("keyup", hendleKeyUP);
    return () => {document.removeEventListener("keyup", hendleKeyUP)};
    
  }, [])

  return (
    <div
      className={rootClasses.join(" ")}
      onClick={() => setVisible(false)}
    >
      <div
        id="modal"
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={classes.modalBtnClose}
          onClick={() => setVisible(false)}
        >
          {CloseBtn.closeIcon}
        </div>
        <h2 className={classes.modalTitle}>{title}</h2>
        {content}
      </div>
    </div>
  );
};

export default Modal;
