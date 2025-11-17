import React, { useState } from "react";

function Task(props) {

    const [editMode, setEditMode] = useState(false)

    function editTask() {
        setEditMode((prevValue) => {
            return !prevValue
        })
    }

    const [editedTask, setEditedTask] = useState({title: props.task.title, description: props.task.description})
    
    function handleChanges(event) {
        const {name, value} = event.target
        setEditedTask((prevValues) => {
            return {
                ...prevValues, [name]: value
            }
        })
    }

    return (
        <div>
            <input type="checkbox" />

            {
            editMode ? 
            <input onChange={handleChanges} name="title" placeholder="task title" value={editedTask.title}/> 
            : 
            <h1>{props.task.title}</h1>
            }

            {
            editMode ? 
            <textarea onChange={handleChanges} name="description" placeholder="description" value={editedTask.description}/> 
            : 
            <p>{props.task.description}</p>
            }
            
            {!editMode ? <button onClick={editTask} type="submit">edit</button> : null}
            {!editMode ? <button onClick={() => {props.onDelete(props.id)}} type="submit">delete</button> : null}
            {
            editMode ? 
            <button 
            onClick={() => {
                props.onEdit(editedTask, props.id)
                editTask()
            }} type="submit">save</button>
            :
            null}
            
        </div>
    )
}


export default Task;