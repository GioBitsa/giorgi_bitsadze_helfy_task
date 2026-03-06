import Button from "../Button";
import Modal from "../Modal";
import styles from "./ConfirmationModal.module.css";

interface ConfirmationModalProps {
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  onClose,
  title,
  description,
  onConfirm,
}: ConfirmationModalProps) => {
  return (
    <Modal onClose={onClose} maxWidth={500}>
      <div className={styles.wrapper}>
        <div className={styles.header}>{title}</div>
        <p>{description}</p>
        <div className={styles.footer}>
          <Button type="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
