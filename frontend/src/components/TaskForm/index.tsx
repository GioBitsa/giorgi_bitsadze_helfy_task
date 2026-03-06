import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import styles from "./TaskForm.module.css";
import { PriorityEnum } from "../../models/priority.enum";
import Button from "../common/Button";
import api from "../../utils/api";
import type { TaskModel } from "../../models/task.model";

interface TaskFormProps {
  onClose: () => void;
  initialData?: TaskModel;
  onSuccess: () => void;
}

const TaskForm = ({ onClose, initialData, onSuccess }: TaskFormProps) => {
  const isEdit = !!initialData;

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    completed: false,
    priority: PriorityEnum.Low,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [shouldValidate, setShouldValidate] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      if (taskDetails.title === "" || taskDetails.description === "") {
        setShouldValidate(true);
        return;
      }

      const resp = (
        await api.post("/tasks", {
          title: taskDetails.title,
          description: taskDetails.description,
          completed: taskDetails.completed,
          priority: taskDetails.priority,
        })
      ).data;

      if (resp.status === 201) {
        console.log("Task created");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (isLoading || !initialData) return;

    try {
      setIsLoading(true);

      if (taskDetails.title === "" || taskDetails.description === "") {
        setShouldValidate(true);
        return;
      }

      const resp = (
        await api.put(`/tasks/${initialData.id}`, {
          title: taskDetails.title,
          description: taskDetails.description,
          completed: taskDetails.completed,
          priority: taskDetails.priority,
        })
      ).data;

      if (resp.status === 200) {
        console.log("Task updated");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTaskDetails({
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      completed: initialData?.completed ?? false,
      priority: initialData?.priority ?? PriorityEnum.Low,
    });
  }, [initialData]);

  return (
    <Modal onClose={onClose} maxWidth={500}>
      <div className={styles.wrapper}>
        <div className={styles.header}>Create new task</div>
        <div className={styles.form}>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={taskDetails.title}
            onChange={(e) =>
              setTaskDetails({ ...taskDetails, title: e.target.value })
            }
          />

          <input
            name="description"
            type="text"
            placeholder="Description"
            value={taskDetails.description}
            onChange={(e) =>
              setTaskDetails({ ...taskDetails, description: e.target.value })
            }
          />

          <div className={styles.priorities}>
            {(Object.values(PriorityEnum) as PriorityEnum[]).map((val) => (
              <div
                key={val}
                className={`${styles.priorities__item} ${
                  taskDetails.priority === val ? styles.active : ""
                }`}
                onClick={() =>
                  setTaskDetails({ ...taskDetails, priority: val })
                }
              >
                {val}
              </div>
            ))}
          </div>

          {/* <div className={styles.checkbox}>
            <input
              id="checkbox"
              name="completed"
              type="checkbox"
              checked={taskDetails.completed}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, completed: e.target.checked })
              }
            />
            <label htmlFor="checkbox">Is task completed</label>
          </div> */}

          {shouldValidate && !taskDetails.title && (
            <p className={styles.required}>Title required!</p>
          )}
          {shouldValidate && !taskDetails.description && (
            <p className={styles.required}>Description required!</p>
          )}

          <Button
            onClick={() => {
              if (isEdit) {
                handleEdit();
              } else {
                handleSubmit();
              }
            }}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskForm;
