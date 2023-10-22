import express from "express";
import {
  addTask,
  getTaskById,
  getTasks,
  getTasksByFilter,
} from "../taskModel/taskQueries.js";
import multer from "multer";
import { addFile, addFileTask } from "../aws-config/submitFIle.js";
import { uploadAnswer } from "../answerModel/answerQueries.js";
import mongoose from "mongoose";
import { authEmployer } from "../middleware/auth.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/postTask",
  authEmployer,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const {
        taskDescription,
        responsibilities,
        jobDescription,
        toDo,
        skills,
        companyId,
      } = req.body;
      req.body.taskDescription = taskDescription.split("\n");
      req.body.responsibilities = responsibilities.split("\n");
      req.body.jobDescription = jobDescription.split("\n");
      req.body.companyId = new mongoose.Types.ObjectId(companyId);
      req.body.toDo = toDo.split("\n");
      if (req?.file) {
        const { Location } = await addFileTask(req.file);

        if (Location) {
          req.body.file = Location;
        }
      }
      const skillsArray = skills.split(",");
      if (skillsArray.length > 0) {
        skillsArray.map((item) => item.trim());
        req.body.skills = skillsArray;
      } else {
        req.body.skills = skillsArray;
      }
      const result = await addTask(req.body);
      if (result?._id) {
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
  }
);
router.post("/submitTask", upload.single("file"), async (req, res, next) => {
  try {
    const { type, ...rest } = req.body;

    if (type === "file") {
      if (req?.file) {
        const { Location } = await addFile(req.file);

        if (Location) {
          rest.file = Location;
          const result = await uploadAnswer({ ...rest, answerType: type });

          if (result?._id) {
            return res.json({
              status: "success",
              message: "Answer has been submitted",
            });
          }
        }
      }
    } else if (type === "text") {
      // rest.text = rest.text.split("\n");
      const result = await uploadAnswer({ ...rest, answerType: type });
      if (result?._id) {
        res.json({
          status: "success",
          message: "Text Answer has been submitted",
        });
      }
    } else if (type === "url") {
      rest.links = rest.links.split(",");
      const result = await uploadAnswer({ ...rest, answerType: type });
      if (result?._id) {
        return res.json({
          status: "success",
          message: "link answer has been submitted",
        });
      }
    }
    res.json({
      status: "error",
      message: "Answer can not be submitted",
    });
  } catch (err) {
    next(err);
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

router.get("/getTaskByCompanyId/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getTasksByFilter({
      companyId: new mongoose.Types.ObjectId(id),
    });
    if (result?.length > 0) {
      return res.json({
        status: "success",
        result,
      });
    } else {
      return res.json({
        status: "error",
        message: "no data",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
