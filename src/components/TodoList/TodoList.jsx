import { memo, useContext } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { TasksContext } from "../../context/TasksContext";

const TodoList = ({ styles }) => {
    const { tasks, filteredTasks } = useContext(TasksContext);

    const hasTasks = filteredTasks.length > 0;

    if (!hasTasks) {
        return (
            <div className={styles.emptyMessage}>There are no tasks yet</div>
        );
    }

    return (
        <ul className={styles.list}>
            {filteredTasks.map((task) => (
                <TodoItem className={styles.item} key={task.id} {...task} />
            ))}
        </ul>
    );
};

export default memo(TodoList);
