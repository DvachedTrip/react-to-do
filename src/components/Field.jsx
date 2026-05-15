const Field = (props) => {
    const {
        className = "",
        id,
        label,
        type = "text",
        value,
        onInput,
        newTaskInputRef,
    } = props;

    return (
        <div className={`field ${className}`}>
            <label className="field__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="field__input"
                id={id}
                placeholder=" "
                autoComplete="off"
                type={type}
                value={value}
                onInput={onInput}
                ref={newTaskInputRef}
            />
        </div>
    );
};

export default Field;
