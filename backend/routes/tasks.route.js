import express from "express";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
  toggleTaskCompletion,
} from "../controllers/tasks.controller.js";

const router = express.Router();

// Get all tasks
router.get("/tasks", getAllTasks);

// Create tasks
router.post("/tasks", createNewTask);

// Update task
router.put("/tasks/:id", updateTask);

// Delete task
router.delete("/tasks/:id", deleteTask);

// Toggle task completion
router.patch("/tasks/:id/toggle", toggleTaskCompletion);

export default router;
