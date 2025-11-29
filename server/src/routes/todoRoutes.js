import express from "express";
import { ensureAuthenticated } from "../middleware/auth.js";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";

const router = express.Router();

router.use(ensureAuthenticated);  // all todo routes need login

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos", updateTodo);
router.delete("/todos", deleteTodo);

export default router;