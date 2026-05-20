import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure?");

    if (isConfirmed) {
      setTasks([]);
    }
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks(tasks.filter((el) => el.id !== taskId));
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    fetch(`http://localhost:3001/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks(
        tasks.map((el) => {
          if (el.id === taskId) {
            return { ...el, isDone: isDone };
          }
          return el;
        }),
      );
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    fetch(`http://localhost:3001/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((addedTask) => {
        setTasks((prevTasks) => [...prevTasks, addedTask]);
        setNewTaskTitle("");
        setSearchQuery("");
        newTaskInputRef.current.focus();
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
  };
};

export default useTasks;
