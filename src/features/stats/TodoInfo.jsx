import { memo, useContext } from "react";
import { TasksContext } from "../../entities/todo/model/TasksContext";

const TodoInfo = ({ styles }) => {
  const { tasks, deleteAllTasks } = useContext(TasksContext);

  const total = tasks.length;
  const hasTasks = total > 0;
  const done = tasks.filter(({ isDone }) => isDone).length;

  return (
    <div className={styles.info}>
      <div className={styles.totalTasks}>
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          className={styles.deleteAllButton}
          type="button"
          onClick={deleteAllTasks}
        >
          Delete all
        </button>
      )}
    </div>
  );
};

export default memo(TodoInfo);
