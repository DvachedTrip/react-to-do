import { useState, useEffect } from "react";
import taskAPI from "../../shared/api/tasks";

const TaskPages = ({ params}) => {
  const taskId = params.id;
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    taskAPI
      .getById(taskId)
      .then((taskData) => {
        setTask(taskData);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [taskId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Task not found</div>;
  }
  

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.isDone ? "Completed" : "Incomplete"}</p>
    </div>
  );
};

export default TaskPages;
