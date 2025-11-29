import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "../src/pages/Register/Register"
import Login from "../src/pages/Login/Login"
import Home from "./pages/Home/Home"
import Todos from "../src/pages/Todos/Todos"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;