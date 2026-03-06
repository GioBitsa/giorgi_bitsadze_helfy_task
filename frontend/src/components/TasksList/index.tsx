import { useEffect, useRef, useState } from "react";
import styles from "./TasksList.module.css";
import type { TaskModel } from "../../models/task.model";
import { useFilterContext } from "../../context/filterContext";
import TaskItem from "../TaskItem";
import EmptyBox from "/assets/empty-box.svg";
import Button from "../common/Button";
import api from "../../utils/api";
import TaskForm from "../TaskForm";

interface TasksListProps {}

const TasksList = ({}: TasksListProps) => {
  const { currentFilter } = useFilterContext();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false); // loading for infinite scrolling
  const [tasksData, setTasksData] = useState<TaskModel[]>([]);
  const [allTasksData, setAllTasksData] = useState<TaskModel[]>(tasksData);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const fetchTasks = async () => {
    try {
      const resp = (
        await api.get<{
          status: number;
          data: TaskModel[];
        }>("/tasks", {
          params: { currentFilter },
        })
      ).data;

      if (resp.status === 200) {
        setTasksData(resp.data);
        setAllTasksData([...resp.data]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowSkeleton(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentFilter]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let timeout: any = null;

    const handleScroll = () => {
      if (timeout) return;

      timeout = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = el;

        if (scrollTop + clientHeight >= scrollHeight - 150) {
          // Reached bottom of carousel
          setInnerLoading(true);

          setTimeout(() => {
            setAllTasksData((prev) => [...prev, ...tasksData]);
            setInnerLoading(false);
          }, 500);
        }

        timeout = null;
      }, 500);
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [showSkeleton, tasksData]);

  const handleRemoveTaskFromList = (taskId: number) => {
    setTasksData((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <>
      {isCreateOpen && (
        <TaskForm
          onClose={() => setIsCreateOpen(false)}
          onSuccess={() => {
            fetchTasks();
          }}
        />
      )}

      {tasksData.length !== 0 && (
        <Button
          onClick={() => setIsCreateOpen(true)}
          style={{ marginLeft: "20px", width: "calc(100% - 40px)" }}
        >
          Create new task
        </Button>
      )}

      <div className={styles.wrapper}>
        {showSkeleton ? (
          <div>skeleton</div>
        ) : tasksData.length === 0 ? (
          <div className={styles.empty}>
            <img src={EmptyBox} alt="empty" />
            <p>Whoops, Tasks list is empty</p>
            <Button onClick={() => setIsCreateOpen(true)}>
              Create new task
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.carousel} ref={carouselRef}>
              {allTasksData.map((item, index) => (
                <TaskItem
                  key={`${item.id} - ${index}`}
                  data={item}
                  onRemove={() => handleRemoveTaskFromList(item.id)}
                  onUpdate={() => {
                    fetchTasks();
                  }}
                />
              ))}
              {innerLoading && <div className={styles.loading} />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TasksList;
