import { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";
import Field from "../Field/Field";

const SearchTaskForm = ({ styles }) => {
    const { searchQuery, setSearchQuery } = useContext(TasksContext);
    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <Field
                className={styles.field}
                label="Search task"
                id="search-task"
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
            />
        </form>
    );
};

export default SearchTaskForm;
