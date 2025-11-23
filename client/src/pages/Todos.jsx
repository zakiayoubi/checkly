import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputArea from "../components/InputArea"
import Task from "../components/Task"

function Todos() {
  // state hook to keep a list of the tasks
  const [taskList, setTaskList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
useEffect(() => {
    fetchTodos()
  }, []
  )


async function fetchTodos() {
    const response = await fetch("http://localhost:3000/todos", {
        credentials: "include",
      });

      if (response.status === 401) {
        navigate("/login");
      } else {
        setLoading(false)
        const data = await response.json()
        const result = data.todos
        setTaskList(result)
      }
}


  async function editTask(updatedTask) {
    await fetch("http://localhost:3000/todos", {
        method: "PUT",
        credentials: "include",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({updatedTask})
    })

    setTaskList(prev => prev.map((task) => {
        return task.id === updatedTask.id ? updatedTask : task
    }
    ));
  }

  async function deleteTask(taskId) {
    try {
        const res = await fetch("http://localhost:3000/todos", {
        method: "DELETE",
        credentials: "include",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({taskId})
        })
        console.log(res)
        if (!res.ok) {
            throw new Error("Delete failed.")
        }
    }

    catch (err) {
        console.log("Failed to delete the task", err)
    }
    

    setTaskList((prev) => prev.filter((task) => {
        return task.id !== taskId
    }))
  }
  
  if (loading) return <div>Loading...</div>

  return (
    <div>
      <InputArea onFetch={fetchTodos}/>
      {taskList.map(task => (
        <Task 
            key={task.id}          // ← THIS IS CRITICAL
            onEdit={editTask}
            onDelete={deleteTask} 
            task={task}
        />
       ))}
    </div>
  )
}

export default Todos;
