import { useContext } from "react";
import AddTaskForm from "../../features/add-task/AddTaskForm";
import SearchTaskForm from "../../features/search-task/SearchTaskForm";
import TodoInfo from "../../features/stats/TodoInfo";
import TodoList from "../../entities/todo/ui/TodoList/TodoList";
import Button from "../../shared/ui/Button";
import { TasksContext } from "../../entities/todo/model/TasksContext";
import styles from "./Todo.module.css";

const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);
  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>To Do List</h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm styles={styles}/>
      <TodoInfo styles={styles}/>
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({
            behavior: "smooth",
          })
        }
      >
        Show first incomplete task
      </Button>
      <TodoList styles={styles} />
    </div>
  );
};

export default Todo;
