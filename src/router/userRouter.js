import express, { json } from "express";
import {
  addWorkHistory,
  findWorkHistory,
} from "../workhistoryModel/workHistoryQueries.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/addWorkHistory", async (req, res, next) => {
  try {
    console.log(req?.body?.userId);
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

router.get("/getWorkHistory/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await findWorkHistory({
      userId: new mongoose.Types.ObjectId(id),
    });

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

export default router;
