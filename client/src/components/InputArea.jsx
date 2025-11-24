import { useState } from "react";
import Dropdown from "./Dropdown";

function InputArea(props) {
    const [task, setTask] = useState({title: "", description: ""})
    const [taskPriority, setTaskPriority] = useState("")

    function handleInput(event) {
        const {name, value} = event.target
        setTask((prevValues) => {
            return {
                ...prevValues, [name]: value
            }
        })
    }

    function selectPriority(priority) {
        console.log(priority)
        setTaskPriority(priority)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const output = {...task, priority: taskPriority}
        const response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({task: output}),
            credentials: "include"
        })

        setTaskPriority("")
        setTask({title: "", description: ""})
        if (response.ok) {
            await props.onFetch()
        }
                
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                onChange={handleInput}
                name="title" 
                placeholder="task title"
                value={task.title}
                required
                />
                <textarea 
                onChange={handleInput}
                name="description" 
                placeholder="description" 
                value={task.description}
                required
                />
                <Dropdown onSelect={selectPriority} selected={taskPriority} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}


export default InputArea;