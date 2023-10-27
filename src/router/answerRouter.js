import express from "express";
import { authEmployer } from "../middleware/auth.js";
import {
  deleteAnswer,
  getAnswerByFilter,
} from "../answerModel/answerQueries.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/getAnswerByEmployer/:id", authEmployer, async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getAnswerByFilter({
      taskId: new mongoose.Types.ObjectId(id),
    });

    if (result?.length > 0) {
      return res.json({ status: "success", result });
    } else {
      return res.json({ status: "error", message: "no applicants apply" });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteAnswer/:id", authEmployer, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteAnswer(id);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "answer has been deleted",
      });
    } else {
      return res.json({
        status: "error",
        message: "Answer can not be deleted",
      });
    }
  } catch (err) {
    next(err);
  }
});
export default router;
