import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import Field from "./Field";

const SearchTaskForm = () => {
    const { searchQuery, setSearchQuery } = useContext(TasksContext);
    return (
        <form className="todo__form" onSubmit={(e) => e.preventDefault()}>
            <Field
                className="todo__field"
                label="Search task"
                id="search-task"
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
            />
        </form>
    );
};

export default SearchTaskForm;
