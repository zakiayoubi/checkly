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

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({task}),
            credentials: "include"
        })

        setTask({title: "", description: ""})
        console.log(response)
        if (response.ok) {
            await props.onFetch()
        }
                
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
                onClick={handleSubmit}
                type="submit"
                >
                Add
                </button>
            </form>
        </div>
    )
}


export default InputArea;