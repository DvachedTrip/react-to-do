import styles from './Button.module.css'

const Button = (props) => {
  const {
    className = "",
    type = "button",
    children,
    onClick,
    isDisabled,
  } = props;

  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
