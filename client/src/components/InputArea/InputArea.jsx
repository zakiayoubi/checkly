// import { useState } from "react";
// import Dropdown from "../Dropdown/Dropdown";

// function InputArea(props) {
//     const [task, setTask] = useState({title: "", description: ""})
//     const [taskPriority, setTaskPriority] = useState("")

//     function handleInput(event) {
//         const {name, value} = event.target
//         setTask((prevValues) => {
//             return {
//                 ...prevValues, [name]: value
//             }
//         })
//     }

//     function selectPriority(priority) {
//         console.log(priority)
//         setTaskPriority(priority)
//     }

//     async function handleSubmit(event) {
//         event.preventDefault();
//         const output = {...task, priority: taskPriority}
//         const response = await fetch("http://localhost:3000/todos", {
//             method: "POST",
//             headers: {"content-type": "application/json"},
//             body: JSON.stringify({task: output}),
//             credentials: "include"
//         })

//         setTaskPriority("")
//         setTask({title: "", description: ""})
//         if (response.ok) {
//             await props.onFetch()
//         }
                
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input 
//                 onChange={handleInput}
//                 name="title" 
//                 placeholder="task title"
//                 value={task.title}
//                 required
//                 />
//                 <textarea 
//                 onChange={handleInput}
//                 name="description" 
//                 placeholder="description" 
//                 value={task.description}
//                 required
//                 />
//                 <Dropdown onSelect={selectPriority} selected={taskPriority} />
//                 <button type="submit">Add</button>
//             </form>
//         </div>
//     )
// }


// export default InputArea;

import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./InputArea.module.css";   // ← NEW

function InputArea(props) {
  const [task, setTask] = useState({ title: "", description: "" });
  const [taskPriority, setTaskPriority] = useState("");

  function handleInput(event) {
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  }

  function selectPriority(priority) {
    setTaskPriority(priority);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const output = { ...task, priority: taskPriority };
    const response = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ task: output }),
      credentials: "include"
    });

    if (response.ok) {
      setTaskPriority("");
      setTask({ title: "", description: "" });
      await props.onFetch();
    }
  }

  return (
    <div className={styles.inputArea}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.titleInput}
          onChange={handleInput}
          name="title"
          placeholder="Task title"
          value={task.title}
          required
        />
        
        <textarea
          className={styles.descriptionTextarea}
          onChange={handleInput}
          name="description"
          placeholder="Description (optional)"
          value={task.description}
        />

        <div className={styles.bottomRow}>
          <Dropdown onSelect={selectPriority} selected={taskPriority} />
          <button type="submit" className={styles.submitBtn}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputArea;