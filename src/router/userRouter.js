import express, { json } from "express";
import {
  addWorkHistory,
  deleteWorkHistory,
  findWorkHistory,
  updateWorkHistory,
} from "../workhistoryModel/workHistoryQueries.js";
import mongoose from "mongoose";
import { authEmployer } from "../middleware/auth.js";
import { addEducation } from "../educationModel/educationModal.js";

const router = express.Router();

router.post("/addWorkHistory", async (req, res, next) => {
  try {
    if (
      req?.body?.description !== undefined &&
      req?.body?.description?.length > 0
    ) {
      req.body.description = req.body.description.split("\n");
      req.body.userId = new mongoose.Types.ObjectId(req.body.userId);
      const result = await addWorkHistory(req.body);

      if (result?.id) {
        return res.json({
          status: "success",
          message: "Work History has been added",
        });
      }
    } else {
      const { description, ...rest } = req.body;
      rest.userId = new mongoose.Types.ObjectId(rest.userId);
      const result = await addWorkHistory(rest);
      if (result?.id) {
        res.json({
          status: "success",
          message: "Work History has been added",
        });
      }
    }
  } catch (err) {
    next(err);
  }
});
router.put("/updateWorkHistory", async (req, res, next) => {
  try {
    if (
      req?.body?.description !== undefined &&
      req?.body?.description?.length > 0
    ) {
      const { _id, userId, ...rest } = req.body;
      rest.description = rest.description.split("\n");
      if (rest?.present === "present") {
        rest.endMonth = "";
        rest.endYear = null;
      }
      const result = await updateWorkHistory(
        {
          _id: new mongoose.Types.ObjectId(_id),
          userId: new mongoose.Types.ObjectId(userId),
        },
        rest
      );

      if (result?.id) {
        return res.json({
          status: "success",
          message: "Work History has been updated",
        });
      }
    } else {
      const { description, _id, userId, ...rest } = req.body;
      if (rest?.present === "present") {
        rest.endMonth = "";
        rest.endYear = null;
      }
      const result = await addWorkHistory(
        {
          _id: new mongoose.Types.ObjectId(_id),
          userId: new mongoose.Types.ObjectId(userId),
        },
        rest
      );
      if (result?.id) {
        return res.json({
          status: "success",
          message: "Work History has been updated",
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

router.get("/getWorkHistory/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await findWorkHistory({
      userId: new mongoose.Types.ObjectId(id),
    });
    console.log(result);
    if (result?.length > 0) {
      return res.json({
        status: "success",
        message: "Work history are found",
        result,
      });
    }
    res.json({
      status: "error",
      message: "no data found",
    });
  } catch (err) {
    next(err);
  }
});
router.delete(
  "/deleteWorkHistory/:id",

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteWorkHistory(id);
      return result?.id
        ? res.json({
            status: "success",
            message: "data has been deleted",
          })
        : res.json({
            status: "error",
            message: "data has not been deleted",
          });
    } catch (err) {
      next(err);
    }
  }
);
router.post("/addEducation", async (req, res, next) => {
  try {
    if (
      req.body.achievements !== undefined &&
      req?.body?.achievements?.length > 0
    ) {
      req.body.achievements = req.body.achievements.split("\n");
      req.body.userId = new mongoose.Types.ObjectId(req.body.userId);
      const result = await addEducation(req.body);
      if (result?._id) {
        return res.json({
          status: "success",
          message: "education has been added",
        });
      }
    } else {
      const { achievements, ...rest } = req.body;
      rest.userId = new mongoose.Types.ObjectId(rest.userId);
      const result = await addEducation(rest);
      if (result?._id) {
        return res.json({
          status: "success",
          message: "education has been added",
        });
      }
    }
  } catch (error) {
    next(error);
  }
});
export default router;
