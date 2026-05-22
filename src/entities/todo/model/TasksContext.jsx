import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";

export const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
  const {
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
  } = useTasks();

  const { firstIncompleteTaskRef, firstIncompleteTaskId } =
    useIncompleteTaskScroll(tasks);

  const value = useMemo(
    () => ({
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
      firstIncompleteTaskRef,
      firstIncompleteTaskId,
    }),
    [
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
      firstIncompleteTaskRef,
      firstIncompleteTaskId,
    ],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
