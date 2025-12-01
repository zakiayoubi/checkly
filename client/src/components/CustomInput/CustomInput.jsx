import styles from './CustomInput.module.css';

function CustomInput(props) {
  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.customInput}
        onChange={(event) => {
          props.onChange(event);
        }}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        required
      />
    </div>
  );
}

export default CustomInput;