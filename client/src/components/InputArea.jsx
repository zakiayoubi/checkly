import React from "react";
import { useState } from "react";

function InputArea(props) {
    const [task, setTask] = useState({title: "", description: ""})
    
    function handleInput(event) {
        const {name, value} = event.target
        setTask((prevValues) => {
            return {
                ...prevValues, [name]: value
            }
        })
    }

    return (
        <div>
            <form>
                <input 
                onChange={handleInput}
                name="title" 
                placeholder="task title"
                value={task.title}
                />
                <textarea 
                onChange={handleInput}
                name="description" 
                placeholder="description" 
                value={task.description}
                />
                <button 
                onClick={(event) => {
                    event.preventDefault();
                    props.onAdd(task)
                    setTask({title: "", description: ""})
                }}
                type="submit"
                >
                Add
                </button>
            </form>
        </div>
    )
}


export default InputArea;