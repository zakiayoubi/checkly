import React, { useState } from 'react'
import InputArea from './components/InputArea'
import Task from './components/Task'

function App() {
  const [tasksList, setTasksList] = useState([])
  
  function addTask(task) {
    setTasksList((prevValues) => {
      return [
        ...prevValues, task
      ]
    })

  }
  return (
    <div>
      <InputArea onAdd={addTask}/>
      {tasksList.map((task, index) => {
        return (
          <Task 
        key={index} 
        id={index} 
        task={task}
        />
        )
      })}
      
    </div>
  )
}

export default App
