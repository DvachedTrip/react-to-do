import Todo from "../components/Todo/Todo";
import { TasksProvider } from "../context/TasksContext";

const TasksPages = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default TasksPages;
