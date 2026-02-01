require("module-alias/register");
const { pool } = require("@/config/database");

const Task = {
  findAll: async () => {
    const [rows] = await pool.query(
      "SELECT id, title, completed, created_at, updated_at FROM tasks ORDER BY created_at DESC",
    );
    return rows;
  },

  findOne: async (id) => {
    const [rows] = await pool.query(
      "SELECT id, title, completed, created_at, updated_at FROM tasks WHERE id = ?",
      [id],
    );
    return rows.length > 0 ? rows[0] : null;
  },

  create: async (taskData) => {
    const { title, completed = false } = taskData;
    const [result] = await pool.query(
      "INSERT INTO tasks (title, completed) VALUES (?, ?)",
      [title, completed],
    );

    return {
      id: result.insertId,
      title,
      completed,
      created_at: new Date(),
      updated_at: new Date(),
    };
  },

  update: async (id, taskData) => {
    const { title, completed } = taskData;
    const [result] = await pool.query(
      "UPDATE tasks SET title = ?, completed = ?, updated_at = NOW() WHERE id = ?",
      [title, completed, id],
    );
    return result.affectedRows;
  },

  destroy: async (id) => {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

module.exports = Task;
