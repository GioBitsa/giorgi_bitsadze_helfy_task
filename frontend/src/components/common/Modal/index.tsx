import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
}

const Modal = ({ onClose, children, maxWidth }: ModalProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.container} style={{ maxWidth: maxWidth }}>
        <div className={styles["children"]}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
