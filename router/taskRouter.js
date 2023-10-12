import express from "express";
import { addTask, getTasks } from "../taskModel/taskQueries.js";

const router = express.Router();

router.post("/postTask", async (req, res, next) => {
  try {
    const { taskDescription, responsibilities } = req.body;
    req.body.taskDescription = taskDescription.split("\n");
    req.body.responsibilities = responsibilities.split("\n");
    const result = await addTask(req.body);
    if (result._id) {
      return res.json({
        status: "success",
        message: "Task has been posted",
      });
    } else {
      res.json({
        status: "error",
        message: "Fail to add data",
      });
    }
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
});

router.get("/getTasks", async (req, res, next) => {
  try {
    const result = await getTasks();
    if (result) {
      res.json({
        status: "success",
        result,
      });
    } else {
      res.json({
        status: "error",
        message: "cannot get tasks",
      });
    }
  } catch (error) {
    error.statusCode = 400;
    next(err);
  }
});

export default router;
