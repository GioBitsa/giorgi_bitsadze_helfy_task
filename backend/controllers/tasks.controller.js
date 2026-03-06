import CustomError from "../common/error.js";
import CustomResponse from "../common/response.js";
import validFilter from "../common/validFilter.js";
import validPriorities from "../common/validPriorities.js";
import tasksData from "../data/tasksData.js";

export const getAllTasks = async (req, res) => {
  const filter = (req.query.currentFilter || "all").toLowerCase();

  let tasksList = [...tasksData];

  switch (filter) {
    case "completed":
      tasksList = tasksList.filter((item) => item.completed);
      break;
    case "pending":
      tasksList = tasksList.filter((item) => !item.completed);
      break;
    case "all":
    default:
      break; // no filtering
  }

  CustomResponse(res, 200, "Tasks fetched successfully", tasksList);
};

export const createNewTask = async (req, res) => {
  try {
    const { title, description, completed, priority } = req.body;

    // Basic input validation
    if (!title || !description) {
      return CustomError(res, 400, "Title and description are required");
    }

    if (priority && !Object.values(validPriorities).includes(priority)) {
      return CustomError(res, 400, "Priority must be low, medium, or high");
    }

    const newTask = {
      id: tasksData.length ? tasksData[tasksData.length - 1].id + 1 : 1,
      title,
      description,
      completed: completed ?? false,
      createdAt: new Date(),
      priority: priority || validPriorities.LOW,
    };

    tasksData.push(newTask);

    CustomResponse(res, 201, "Task created successfully", newTask);
  } catch (error) {
    console.log(error);
    CustomError(res, 500);
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, priority } = req.body;

  // Find the task by id
  const taskIndex = tasksData.findIndex((task) => task.id === Number(id));

  if (taskIndex === -1) {
    return CustomError(res, 404, "Task not found");
  }

  try {
    tasksData[taskIndex] = {
      ...tasksData[taskIndex],
      title: title ?? tasksData[taskIndex].title,
      description: description ?? tasksData[taskIndex].description,
      completed: completed ?? tasksData[taskIndex].completed,
      priority: priority ?? tasksData[taskIndex].priority,
    };

    CustomResponse(res, 200, "Task updated successfully", tasksData[taskIndex]);
  } catch (error) {
    console.log(error);
    CustomError(res, 500);
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  // Find the task by id
  const taskIndex = tasksData.findIndex((task) => task.id === Number(id));

  if (taskIndex === -1) {
    return CustomError(res, 404, "Task not found");
  }

  try {
    // Remove task from array
    const deletedTask = tasksData.splice(taskIndex, 1)[0];

    CustomResponse(res, 200, "Task deleted successfully", deletedTask);
  } catch (error) {
    CustomError(res, 500);
  }
};

export const toggleTaskCompletion = async (req, res) => {
  const { id } = req.params;

  // Find the task by id
  const taskIndex = tasksData.findIndex((task) => task.id === Number(id));

  if (taskIndex === -1) {
    CustomError(res, 404, "Task not found");
  }

  try {
    tasksData[taskIndex] = {
      ...tasksData[taskIndex],
      completed: !tasksData[taskIndex].completed,
    };

    CustomResponse(
      res,
      200,
      "Task completion toggled successfully",
      tasksData[taskIndex]
    );
  } catch (error) {
    CustomError(res, 500);
  }
};
