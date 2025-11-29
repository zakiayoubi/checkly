import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./Task.module.css";

function Task(props) {
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({
    taskId: props.task.id,
    priority: props.task.priority,
    title: props.task.title,
    description: props.task.description,
    completed: props.task.completed
  });

  const isCompleted = editedTask.completed;

  function toggleEdit() { setEditMode(prev => !prev); }

  function handleChanges(e) {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  }

  async function handleCheckBox(e) {
  const newCheckedValue = e.target.checked;

  // 1. Optimistic update. instantaneous display of the checkmark.
  setEditedTask(prev => ({ ...prev, completed: newCheckedValue }));

  try {
    // 2. Try to save to backend
    const response = await fetch("http://localhost:3000/api/todos", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updatedTask: { taskId: props.task.id, completed: newCheckedValue }
      })
    });

    // If server says NO (4xx/5xx error), fix the checkbox
    if (!response.ok) {
      throw new Error("Save failed");
    }

    // Success! Do nothing – our optimistic update was correct

  } catch (error) {
    // 3. ROLLBACK – put checkbox back to what it was before
    setEditedTask(prev => ({ ...prev, completed: !newCheckedValue }));

    // Optional: tell the user
    alert("Could not save. Reverted.");
    console.error("Failed to update checkbox:", error);
  }
}

  return (
    <div className={`${styles.task} ${isCompleted ? styles.completed : ""}`}>
      <Checkbox onCheck={handleCheckBox} checked={isCompleted} />

      <div className={styles.content}>
        {editMode ? (
          <input
            className={styles.editInput}
            onChange={handleChanges}
            name="title"
            value={editedTask.title}
            placeholder="Task title"
          />
        ) : (
          <h1 className={styles.title}>{editedTask.title}</h1>
        )}

        {editMode ? (
          <textarea
            className={styles.editTextarea}
            onChange={handleChanges}
            name="description"
            value={editedTask.description}
            placeholder="Description"
          />
        ) : (
          <p className={styles.description}>{editedTask.description}</p>
        )}

        {editMode ? (
          <select
            className={styles.editSelect}
            name="priority"
            onChange={handleChanges}
            value={editedTask.priority}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        ) : (
          <span className={styles.priority}>{editedTask.priority}</span>
        )}

        <div className={styles.actions}>
          {!editMode ? (
            <>
              <button onClick={toggleEdit} className={`${styles.btn} ${styles.editBtn}`}>Edit</button>
              <button onClick={() => props.onDelete(props.task.id)} className={`${styles.btn} ${styles.deleteBtn}`}>Delete</button>
            </>
          ) : (
            <>
              <button onClick={toggleEdit} className={`${styles.btn} ${styles.cancelBtn}`}>Cancel</button>
              <button onClick={() => { props.onEdit(editedTask); toggleEdit(); }} className={`${styles.btn} ${styles.saveBtn}`}>Save</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;