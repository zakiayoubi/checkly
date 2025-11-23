import { useState } from "react";

function Task(props) {
    const [editMode, setEditMode] = useState(false)
    const [editedTask, setEditedTask] = useState({id: props.task.id, title: props.task.title, description: props.task.description})

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

    return (
        <div>
            <input type="checkbox" />
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
            
            {!editMode ? <button onClick={editTask} type="submit">edit</button> : null}
            {!editMode ? <button onClick={() => {props.onDelete(props.task.id)}} type="submit">delete</button> : null}
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