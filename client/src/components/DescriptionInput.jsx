import React from "react";

function DescriptionInput() {
    const [descriptionInput, setDescriptionInput] = useState("")
    
    function handleInput(event) {
        const {value} = event.target
        setDescriptionInput(value)       
    }
    return (
        <textarea 
            onChange={handleInput}
            name="description" 
            placeholder="description"
            value={descriptionInput}
            />
    )
}


export default DescriptionInput;