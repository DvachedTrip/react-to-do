import {
    createContext,
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from "react";

export const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
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

    return (
        <TasksContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstIncompleteTaskRef,
                firstIncompleteTaskId,
                deleteTask,
                deleteAllTasks,
                toggleTaskComplete,
                addTaskSubmit: addTask,
                newTaskTitle,
                setNewTaskTitle,
                newTaskInputRef,
                searchQuery,
                setSearchQuery,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};
