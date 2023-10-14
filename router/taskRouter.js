import express from "express";
import { addTask, getTaskById, getTasks } from "../taskModel/taskQueries.js";

const router = express.Router();

router.post("/postTask", async (req, res, next) => {
  try {
    const { taskDescription, responsibilities, toDo, skills } = req.body;
    req.body.taskDescription = taskDescription.split("\n");
    req.body.responsibilities = responsibilities.split("\n");
    req.body.toDo = toDo.split("\n");
    const skillsArray = skills.split(",");
    if (skillsArray.length > 0) {
      skillsArray.map((item) => item.trim());
      req.body.skills = skillsArray;
    } else {
      req.body.skills = skillsArray;
    }
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
router.get("/getTaskById/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getTaskById(id);
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
