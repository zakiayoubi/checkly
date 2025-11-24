function Checkbox(props) {
    return (
        <input 
        onChange={(event) => props.onCheck(event)} 
        name="checkbox" 
        type="checkbox" 
        checked={props.checked}
        style={{ width: "20px", height: "20px" }}
        />
    )
}


export default Checkbox;