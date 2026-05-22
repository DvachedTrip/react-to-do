import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  act,
} from "react";
import tasksAPI from "../../../shared/api/tasks";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL": {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }
    case "ADD": {
      return [...state, action.task];
    }
    case "TOGGLE_COMPLETE": {
      const { id, isDone } = action;

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task;
      });
    }
    case "DELETE": {
      return state.filter((task) => task.id !== action.id);
    }
    case "DELETE_ALL": {
      return [];
    }
    default: {
      return state;
    }
  }
};

const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure?");

    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => {
        dispatch({ type: "DELETE_ALL" });
      });
    }
  }, [tasks]);

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId).then((res) => {
      if (res.ok) {
        setDisappearingTaskId(taskId);
        setTimeout(() => {
          dispatch({ type: "DELETE", id: taskId });
          setDisappearingTaskId(null);
        }, 400);
      }
    });
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    tasksAPI
      .getAll()
      .then((response) => dispatch({ type: "SET_ALL", tasks: response }));
  }, []);

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone).then(() => {
      dispatch({ type: "TOGGLE_COMPLETE", id: taskId, isDone });
    });
  }, []);

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      dispatch({ type: "ADD", task: addedTask });
      setNewTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current.focus();
      setAppearingTaskId(addedTask.id);
      setTimeout(() => {
        setAppearingTaskId(null);
      }, 400);
    });
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : tasks;
  }, [searchQuery, tasks]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
    searchQuery,
    setSearchQuery,
    disappearingTaskId,
    appearingTaskId,
  };
};

export default useTasks;
