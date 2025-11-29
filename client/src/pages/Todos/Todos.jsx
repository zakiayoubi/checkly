// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import InputArea from "../../components/InputArea/InputArea"
// import Task from "../../components/Task/Task"
// import Header from '../../components/Header/Header'
// import Footer from '../../components/Footer/Footer'

// function Todos() {
//   // state hook to keep a list of the tasks
//   const [taskList, setTaskList] = useState([])
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()
  
// useEffect(() => {
//     fetchTodos()
//   }, []
//   )


// async function fetchTodos() {
//     const response = await fetch("http://localhost:3000/todos", {
//         credentials: "include",
//       });

//       if (response.status === 401) {
//         navigate("/login");
//       } else {
//         setLoading(false)
//         const data = await response.json()
//         const result = data.todos
//         setTaskList(result)
//       }
// }


//   async function editTask(updatedTask) {
//     console.log(updatedTask)
//     await fetch("http://localhost:3000/todos", {
//         method: "PUT",
//         credentials: "include",
//         headers: {"content-type": "application/json"},
//         body: JSON.stringify({updatedTask})
//     })

//     setTaskList(prev => prev.map((task) => {
//         return task.id === updatedTask.id ? updatedTask : task
//     }
//     ));
//   }

//   async function deleteTask(taskId) {
//     try {
//         const res = await fetch("http://localhost:3000/todos", {
//         method: "DELETE",
//         credentials: "include",
//         headers: {"content-type": "application/json"},
//         body: JSON.stringify({taskId})
//         })
//         if (!res.ok) {
//             throw new Error("Delete failed.")
//         }
//     }

//     catch (err) {
//         console.log("Failed to delete the task", err)
//     }
    

//     setTaskList((prev) => prev.filter((task) => {
//         return task.id !== taskId
//     }))
//   }
  
//   if (loading) return <div>Loading...</div>

//   return (
//     <div>
//       <Header />
//       <InputArea onFetch={fetchTodos}/>
//       {taskList.map(task => (
//         <Task 
//             key={task.id}          // ← THIS IS CRITICAL
//             onEdit={editTask}
//             onDelete={deleteTask} 
//             task={task}
//         />
//        ))}
//       <Footer />
//     </div>
//   )
// }

// export default Todos;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputArea from "../../components/InputArea/InputArea";
import Task from "../../components/Task/Task";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Todos.module.css';

function Todos() {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const response = await fetch("http://localhost:3000/api/todos", {
      credentials: "include",
    });

    if (response.status === 401) {
      navigate("/login");
    } else {
      setLoading(false);
      const data = await response.json();
      setTaskList(data.todos || []);
    }
  }

  async function editTask(updatedTask) {
    await fetch("http://localhost:3000/api/todos", {
      method: "PUT",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ updatedTask })
    });

    setTaskList(prev => prev.map(task =>
      task.id === updatedTask.taskId ? { ...task, ...updatedTask } : task
    ));
  }

  async function deleteTask(taskId) {
    await fetch("http://localhost:3000/api/todos", {
      method: "DELETE",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ taskId })
    });

    setTaskList(prev => prev.filter(task => task.id !== taskId));
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.loading}>Loading your tasks...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <InputArea onFetch={fetchTodos} />

        <div className={styles.taskList}>
          {taskList.length === 0 ? (
            <p className={styles.empty}>No tasks yet. Add one above!</p>
          ) : (
            taskList.map(task => (
              <Task
                key={task.id}
                task={task}
                onEdit={editTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Todos;