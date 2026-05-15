import { useState, useEffect, useRef, useCallback } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import Button from "./Button";

const Todo = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const newTaskInputRef = useRef(null);
    const firstIncompleteTaskRef = useRef(null);
    const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm("Are you sure?");

        if (isConfirmed) {
            setTasks([]);
        }
    }, []);

    const deleteTask = useCallback(
        (taskId) => {
            setTasks(tasks.filter((el) => el.id !== taskId));
        },
        [tasks],
    );

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        newTaskInputRef.current.focus();
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

    const addTask = useCallback(() => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskTitle("");
            setSearchQuery("");
            newTaskInputRef.current.focus();
        }
    }, [newTaskTitle]);

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase();

        return clearSearchQuery.length > 0
            ? tasks.filter(({ title }) =>
                  title.toLowerCase().includes(clearSearchQuery),
              )
            : tasks;
    }, [searchQuery, tasks]);

    const doneTasks = useMemo(() => {
        return tasks.filter(({ isDone }) => isDone).length;
    }, [tasks]);

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTaskSubmit={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                newTaskInputRef={newTaskInputRef}
            />
            <SearchTaskForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo
                total={tasks.length}
                done={doneTasks}
                onDelete={deleteAllTasks}
            />
            <Button
                onClick={() =>
                    firstIncompleteTaskRef.current?.scrollIntoView({
                        behavior: "smooth",
                    })
                }
            >
                Show first incomplete task
            </Button>
            <TodoList
                filteredTasks={filteredTasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
                firstIncompleteTaskId={firstIncompleteTaskId}
            />
        </div>
    );
};

export default Todo;
