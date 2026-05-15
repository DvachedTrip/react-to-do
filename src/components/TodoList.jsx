import { memo } from "react";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
    const {
        onDeleteTaskButtonClick,
        onTaskCompleteChange,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = props;

    const hasTasks = filteredTasks.length > 0;

    if (!hasTasks) {
        return (
            <div className="todo__empty-message">There are no tasks yet</div>
        );
    }

    return (
        <ul className="todo__list">
            {filteredTasks.map((task) => (
                <TodoItem
                    className="todo__item"
                    key={task.id}
                    ref={
                        task.id === firstIncompleteTaskId
                            ? firstIncompleteTaskRef
                            : null
                    }
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    onTaskCompleteChange={onTaskCompleteChange}
                    {...task}
                />
            ))}
        </ul>
    );
};

export default memo(TodoList);
