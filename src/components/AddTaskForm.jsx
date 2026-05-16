import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import Field from "./Field";
import Button from "./Button";

const AddTaskForm = () => {
    const { addTaskSubmit, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
        useContext(TasksContext);

    const onSubmit = (e) => {
        e.preventDefault();
        addTaskSubmit();
    };

    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Field
                className="todo__field"
                label="New task title"
                id="new-task"
                value={newTaskTitle}
                onInput={(e) => setNewTaskTitle(e.target.value)}
                newTaskInputRef={newTaskInputRef}
            />
            <Button type="submit">Add</Button>
        </form>
    );
};

export default AddTaskForm;
