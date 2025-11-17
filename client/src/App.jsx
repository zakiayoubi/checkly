import React, { useState } from 'react'
import InputArea from './components/InputArea'
import Task from './components/Task'
import Register from './pages/Register';


// function App() {
//   // state hook to keep a list of the tasks
//   const [tasksList, setTasksList] = useState([])
  
//   // a function that is triggered in InputArea.jsx by the add button and calls the setTaskList hook. 
//   function addTask(task) {
//     setTasksList((prevValues) => {
//       return [
//         ...prevValues, task
//       ]
//     })
//   }

//   // a function that is triggered by a delete button in Task.jsx and removes a task given their id. 
//   function deleteTask(id) {
//     console.log(id)
//     setTasksList((prevValues) => {
//       return prevValues.filter((task, index) => {
//         return index !==id
//       })
//     })
//   }

//   function editTask(editedTask, id) {
//     setTasksList((prevValues) => {
//       return (
//         prevValues.map((task, index) => {
//           return index === id ? editedTask : task
//         })
//       )
//     })
//   }

//   return (
//     <div>
//       <InputArea onAdd={addTask}/>
//       {tasksList.map((task, index) => {
//         return (
//           <Task 
//         key={index} 
//         id={index} 
//         task={task}
//         onDelete={deleteTask}
//         onEdit={editTask}
//         />
//         )
//       })}
      
//     </div>
//   )
// }

function App() {
  return (
    <div>
      <h1>Register Page</h1>
      <Register />
    </div>
  );
}
export default App
