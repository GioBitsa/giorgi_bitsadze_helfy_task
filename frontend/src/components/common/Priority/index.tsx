import styles from "./Priority.module.css";

interface PriorityProps {
  type: "low" | "medium" | "high";
}

const Priority = ({ type }: PriorityProps) => {
  return (
    <div className={`${styles.wrapper} ${styles[`priority-${type}`]}`}>
      {type[0]}
    </div>
  );
};

export default Priority;
