import styles from "./Field.module.css";

const Field = (props) => {
  const {
    className = "",
    id,
    label,
    type = "text",
    value,
    onInput,
    newTaskInputRef,
    error,
  } = props;

  return (
    <div className={`${styles.field} ${className} `}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.isInvalid : ""}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value}
        onInput={onInput}
        ref={newTaskInputRef}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Field;
