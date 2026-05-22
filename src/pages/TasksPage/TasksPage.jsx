import Todo from "../../widgets/Todo";
import { TasksProvider } from "../../entities/todo/model/TasksContext";

const TasksPages = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default TasksPages;
