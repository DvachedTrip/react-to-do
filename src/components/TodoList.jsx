import { memo, useContext } from "react";
import TodoItem from "./TodoItem";
import { TasksContext } from "../context/TasksContext";

const TodoList = () => {
    const { tasks, filteredTasks } = useContext(TasksContext);

    const hasTasks = filteredTasks.length > 0;

    if (!hasTasks) {
        return (
            <div className="todo__empty-message">There are no tasks yet</div>
        );
    }

    return (
        <ul className="todo__list">
            {filteredTasks.map((task) => (
                <TodoItem className="todo__item" key={task.id} {...task} />
            ))}
        </ul>
    );
};

export default memo(TodoList);
