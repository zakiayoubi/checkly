import React from "react";

function TitleInput() {
    const [titleInput, setTitleInput] = useState("")
    
    function handleInput(event) {
        const {value} = event.target
        setTitleInput(value)       
    }
    return (
        <input 
            onChange={handleInput}
            name="title" 
            placeholder="task title"
            value={titleInput}
            />
    )
}


export default TitleInput;