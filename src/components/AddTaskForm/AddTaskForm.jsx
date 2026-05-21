import { useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import Field from "../Field/Field";
import Button from "../Button/Button";

const AddTaskForm = ({ styles }) => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    useContext(TasksContext);

  const [error, setError] = useState("");

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle);
    }
  };

  const onInput = (e) => {
    const { value } = e.target;
    const hasOnlySpaces = value.length > 0 && value.trim().length === 0;
    setNewTaskTitle(value);
    setError(hasOnlySpaces ? "The tasks cannot be empty" : "");
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        className={styles.field}
        label="New task title"
        id="new-task"
        value={newTaskTitle}
        onInput={onInput}
        newTaskInputRef={newTaskInputRef}
        error={error}
      />
      <Button type="submit" isDisabled={isNewTaskTitleEmpty}>
        Add
      </Button>
    </form>
  );
};

export default AddTaskForm;
