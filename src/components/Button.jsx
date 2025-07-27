import styles from "./Button.module.css";

function Button({ children, onClick, variation = "primary" }) {
  return (
    <button className={`${styles.btn} ${styles[variation]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
