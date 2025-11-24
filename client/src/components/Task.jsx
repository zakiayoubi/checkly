import { useState, useEffect } from "react";
import Checkbox from "./Checkbox";

function Task(props) {
    const [editMode, setEditMode] = useState(false)
    const [editedTask, setEditedTask] = useState({
        taskId: props.task.id, 
        priority: props.task.priority, 
        title: props.task.title, 
        description: props.task.description,
        completed: props.task.completed
    })
    console.log(editedTask.completed)

    function editTask() {
        setEditMode((prevValue) => {
            return !prevValue
        })
    }

    function handleChanges(event) {
        const {name, value} = event.target
        setEditedTask((prevValues) => {
            return {
                ...prevValues, [name]: value
            }
        })
    }

    async function handleCheckBox(event) {
        const checked = event.target.checked
        console.log(checked)

        setEditedTask((prev) => {
            return {...prev, completed: checked}
        })
        // SEND EXACTLY WHAT SERVER EXPECTS
        await fetch("http://localhost:3000/todos", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            updatedTask: {
                taskId: props.task.id,
                completed: checked
            }
            })
        });

        
    }


    return (
        <div>
            <Checkbox onCheck={handleCheckBox} checked={editedTask.completed}/>
            {
            editMode ? 
            <input onChange={handleChanges} name="title" placeholder="task title" value={editedTask.title}
            /> 
            : 
            <h1>{editedTask.title}</h1>
            }

            {
            editMode ? 
            <textarea onChange={handleChanges} name="description" placeholder="description" value={editedTask.description}/> 
            : 
            <p>{editedTask.description}</p>
            }
            {
            editMode ? 
            <select name="priority" onChange={handleChanges} value={editedTask.priority}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
            :
            <p style={{color: "red"}}>{editedTask.priority}</p>
            }
            

            {!editMode ? <button onClick={editTask} type="submit">edit</button> : null}
            {!editMode ? <button onClick={() => {props.onDelete(props.task.id)}} type="submit">delete</button> : null}
            {
            editMode ? 
            <button 
            onClick={() => {
                editTask()
            }} type="submit">cancel</button>
            :
            null}
            {
            editMode ? 
            <button 
            onClick={() => {
                props.onEdit(editedTask)
                editTask()
            }} type="submit">save</button>
            :
            null}

            
        </div>
    )
}


export default Task;