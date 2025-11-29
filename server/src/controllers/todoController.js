// src/controllers/todoController.js
import db from "../config/db.js";

export async function getTodos(req, res) {
  const result = await db.query("SELECT * FROM todos WHERE user_id = $1", [req.user.id]);
  res.json({ todos: result.rows });
}

export async function createTodo(req, res) {
  const { priority, title, description } = req.body.task;
  const result = await db.query(
    "INSERT INTO todos (user_id, priority, title, description) VALUES ($1,$2,$3,$4) RETURNING *",
    [req.user.id, priority, title, description]
  );
  res.json({ success: true, todo: result.rows[0] });
}

export async function updateTodo(req, res) {
  const { taskId, completed, priority, title, description } = req.body.updatedTask;

  const updates = [];
  const values = [];
  let index = 1;

  if (title !== undefined) { updates.push(`title = $${index++}`); values.push(title); }
  if (description !== undefined) { updates.push(`description = $${index++}`); values.push(description); }
  if (priority !== undefined) { updates.push(`priority = $${index++}`); values.push(priority); }
  if (completed !== undefined) { updates.push(`completed = $${index++}`); values.push(completed); }

  values.push(taskId, req.user.id);

  const query = `UPDATE todos SET ${updates.join(", ")} 
                 WHERE id = $${index} AND user_id = $${index + 1} RETURNING *`;

  const result = await db.query(query, values);
  res.json({ success: result.rowCount === 1 });
}

export async function deleteTodo(req, res) {
  const { taskId } = req.body;
  const result = await db.query("DELETE FROM todos WHERE id = $1 AND user_id = $2", [taskId, req.user.id]);
  res.json({ success: result.rowCount === 1 });
}