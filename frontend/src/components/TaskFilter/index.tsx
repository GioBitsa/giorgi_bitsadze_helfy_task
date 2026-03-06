import styles from "./TaskFilter.module.css";
import { useFilterContext } from "../../context/filterContext";
import { FilterType } from "../../models/filter.model";

const TaskFilter = () => {
  const { currentFilter, setCurrentFilter } = useFilterContext();

  return (
    <>
      <div className={styles.wrapper}>
        {Object.values(FilterType).map((filterValue: any) => (
          <div
            key={filterValue}
            onClick={() => setCurrentFilter(filterValue)}
            className={`${styles.filter} ${
              currentFilter === filterValue ? styles.active : ""
            }`}
          >
            {filterValue}
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskFilter;
