import React from "react"

function CustomInput(props) {

    return (
        <input 
            onChange={(event) => {
                props.onChange(event)
            }}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            required
        />
    )
}


export default CustomInput;