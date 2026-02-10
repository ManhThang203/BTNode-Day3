require("module-alias/register");
const express = require("express");
const router = express.Router();
const Task = require("@/models/task.model");

/**
 * GET /tasks - Get all tasks
 */
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.success(tasks);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /tasks/:id - Get a single task by ID
 */
router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findOne(req.params.id);
    if (!task) {
      return res.error(404, "Task not found");
    }
    res.success(task);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /tasks - Create a new task
 */
router.post("/", async (req, res, next) => {
  try {
    const { title, completed } = req.body;

    if (!title) {
      return res.error(400, "Title is required");
    }

    const task = await Task.create({ title, completed });
    res.success(task, 201);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /tasks/:id - Update a task
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const taskId = req.params.id;

    const existingTask = await Task.findOne(taskId);
    if (!existingTask) {
      return res.error(404, "Task not found");
    }

    const affectedRows = await Task.update(taskId, { title, completed });
    res.success({ affectedRows });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /tasks/:id - Delete a task
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const existingTask = await Task.findOne(taskId);
    if (!existingTask) {
      return res.error(404, "Task not found");
    }

    const affectedRows = await Task.destroy(taskId);
    res.success({ affectedRows });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
