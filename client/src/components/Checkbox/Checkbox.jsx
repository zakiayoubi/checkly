import styles from "./Checkbox.module.css";

function Checkbox(props) {
  return (
    <input
      className={styles.checkbox}
      onChange={(event) => props.onCheck(event)}
      name="checkbox"
      type="checkbox"
      checked={props.checked}
    />
  );
}

export default Checkbox;