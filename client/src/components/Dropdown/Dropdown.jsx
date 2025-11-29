// function Dropdown({ onSelect, selected}) {  // ← add selected prop
//   return (
//     <select 
//       onChange={(e) => onSelect(e.target.value)} 
//       value={selected} 
//       required
//     >
//       <option value="" disabled hidden>Priority</option>
//       <option value="A">A</option>
//       <option value="B">B</option>
//       <option value="C">C</option>
//       <option value="D">D</option>
//     </select>
//   );
// }

// export default Dropdown;

import styles from "./Dropdown.module.css";

function Dropdown({ onSelect, selected }) {
  return (
    <select
      className={styles.select}
      onChange={(e) => onSelect(e.target.value)}
      value={selected || ""}   // fallback to empty string
      required
    >
      <option value="" disabled hidden>
        Priority
      </option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
    </select>
  );
}

export default Dropdown;