const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");

// Middlewares
const getTask = async (req, res, next) => {
  let task;
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Invalid id" });
  }
  try {
    task = await Task.findById(id);
    if (task === null) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.task = task;
  next();
};

// Routes
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res.status(204).json({ message: "No tasks found" });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, description, date_end, subtasks, done } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const task = new Task({
    title,
    description,
    date_end,
    subtasks,
    done,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", getTask, async (req, res) => {
  res.json(res.task);
});

router.put("/:id", getTask, async (req, res) => {
  try {
    const task = res.task;
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.subtaks = req.body.subtaks || task.subtaks;
    task.date_end = req.body.date_end || task.date_end;
    task.done = req.body.done || task.done;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getTask, async (req, res) => {
  if (
    !req.body.title &&
    !req.body.description &&
    !req.body.date_end &&
    !req.body.done &&
    !req.body.subtaks
  ) {
    console.log(req.body);
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const task = res.task;
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.subtaks = req.body.subtaks || task.subtaks;
    task.date_end = req.body.date_end || task.date_end;
    task.done = req.body.done || task.done;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getTask, async (req, res) => {
  try {
    const task = res.task;
    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
