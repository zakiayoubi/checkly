import React from "react";

function Task(props) {
    console.log(props)
    return (
        <div>
            <h1>{props.task.title}</h1>
            <p>{props.task.description}</p>
        </div>
    )
}


export default Task;