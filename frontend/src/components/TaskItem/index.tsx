import { useState } from "react";
import type { TaskModel } from "../../models/task.model";
import api from "../../utils/api";
import styles from "./TaskItem.module.css";
import moment from "moment";
import Priority from "../common/Priority";
import ConfirmationModal from "../common/ConfirmationModal";
import TaskForm from "../TaskForm";

interface TaskItemProps {
  data: TaskModel;
  onRemove: () => void;
  onUpdate: () => void;
}

const TaskItem = ({
  data: {
    id,
    title,
    description,
    completed: initialCompleted,
    createdAt,
    priority,
  },
  onRemove,
  onUpdate,
}: TaskItemProps) => {
  const [completed, setCompleted] = useState(initialCompleted);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isTasksDetailsOpen, setIsTasksDetailsOpen] = useState(false);

  const handleChangeCompletion = async () => {
    setCompleted(!completed);
    try {
      const resp = (await api.patch(`/tasks/${id}/toggle`)).data;

      if (resp.status === 200) {
        setCompleted(resp.data.completed);
      }
    } catch (error) {
      console.log(error);
      setCompleted(!completed);
    }
  };

  const handleRemoveTask = async () => {
    try {
      const resp = (await api.delete(`/tasks/${id}`)).data;

      if (resp.status === 200) {
        onRemove();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isDeleteOpen && (
        <ConfirmationModal
          onClose={() => setIsDeleteOpen(false)}
          title="Are you sure?"
          description="You are deleting this current task. please confirm"
          onConfirm={handleRemoveTask}
        />
      )}

      {isTasksDetailsOpen && (
        <TaskForm
          onClose={() => setIsTasksDetailsOpen(false)}
          initialData={{
            title,
            description,
            priority,
            completed,
            createdAt,
            id,
          }}
          onSuccess={onUpdate}
        />
      )}

      <div
        className={styles.wrapper}
        onClick={() => setIsTasksDetailsOpen(true)}
      >
        <div className={styles.wrapper__text}>
          <h6>{title}</h6>
          <p>{description}</p>
          <p>{moment(createdAt).format("DD MMM YYYY HH:mm")}</p>

          <div
            className={styles.remove}
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteOpen(true);
            }}
          >
            remove task
          </div>
        </div>

        <div className={styles.wrapper__action}>
          <Priority type={priority} />
          <div
            className={`${styles.toggle} ${completed ? styles.active : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              handleChangeCompletion();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TaskItem;
