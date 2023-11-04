import express, { json } from "express";
import {
  addWorkHistory,
  deleteWorkHistory,
  findWorkHistory,
  updateWorkHistory,
} from "../workhistoryModel/workHistoryQueries.js";
import mongoose from "mongoose";
import { authEmployer } from "../middleware/auth.js";
import {
  addEducation,
  deleteEducation,
  getEducationByFilter,
  updateEducation,
} from "../educationModel/educationModal.js";
import multer from "multer";
import { addPost, deletePost, getPosts } from "../postModel/postQueries.js";
import { addPostFile } from "../aws-config/submitFIle.js";
import { getPostPreSigned } from "../aws-config/getFile.js";
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
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
      const result = await addWorkHistory({ ...rest, description: [] });
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
      const result = await updateWorkHistory(
        {
          _id: new mongoose.Types.ObjectId(_id),
          userId: new mongoose.Types.ObjectId(userId),
        },
        { description: [], ...rest }
      );
      console.log("this is result line 90", result);
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
      if (req.body.level === "High School") {
        req.body.field = "";
      }
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
      if (req.body.level === "High School") {
        rest.body.field = "";
      }
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

router.get("/getEducation/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getEducationByFilter({
      userId: new mongoose.Types.ObjectId(id),
    });
    return res.json({
      status: "success",
      result,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/updateEducation", async (req, res, next) => {
  try {
    console.log(req.body);
    if (
      req.body.achievements !== undefined &&
      req?.body?.achievements?.length > 0
    ) {
      req.body.achievements = req.body.achievements.split("\n");
      req.body.userId = new mongoose.Types.ObjectId(req.body.userId);
      if (req.body.level === "High School") {
        req.body.field = "";
      }
      if (req?.body?.present === "present") {
        req.body.endMonth = "";
        req.body.endYear = null;
      }
      const { _id, userId, ...rest } = req.body;
      const result = await updateEducation(
        {
          _id: new mongoose.Types.ObjectId(req.body._id),
          userId: new mongoose.Types.ObjectId(req.body.userId),
        },
        rest
      );
      if (result?._id) {
        return res.json({
          status: "success",
          message: "education has been added",
        });
      }
    } else {
      req.body.userId = new mongoose.Types.ObjectId(req.body.userId);
      if (req.body.level === "High School") {
        req.body.field = "";
      }
      if (req?.body?.present === "present") {
        req.body.endMonth = "";
        req.body.endYear = null;
      }
      const { achievements, _id, userId, ...rest } = req.body;
      const result = await updateEducation(
        {
          _id: new mongoose.Types.ObjectId(_id),
          userId: new mongoose.Types.ObjectId(userId),
        },
        { ...rest, achievements: [] }
      );
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
router.delete("/deleteEducation/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteEducation(id);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "education has been deleted",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post(
  "/user/postProject",
  upload.single("posting"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      if (req?.file !== undefined) {
        const { Location } = await addPostFile(req.file);
        console.log("this is location:", Location);
        if (Location !== undefined) {
          const result = await addPost({ ...req.body, file: Location });
          if (result?._id) {
            return res.json({
              status: "success",
              message: "project has been posted",
            });
          } else {
            return res.json({
              status: "error",
              message: "project can not be posted",
            });
          }
        }
      }
      const respond = await addPost(req.body);
      if (respond?._id) {
        return res.json({
          status: "success",
          message: "Project has been posted",
        });
      } else {
        return res.json({
          status: "error",
          message: "Project can not be posted",
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get("/getAllPost/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const postResult = await getPosts({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (postResult?.length > 0) {
      //  for (let index = 0; index < postResult.length; index++) {
      //   if(postResult[index]?.file?.length>0){
      //     console.log("this is line numbe 323 reading post result:",postResult[index].file);
      //     const presignedURL= await getPostPreSigned(postResult[index].file);
      //     postResult[index].file= presignedURL;
      //    }
      //  }
      // console.log(postResult);
      return res.json({
        status: "success",
        result: postResult,
      });
    } else {
      return res.json({
        status: "success",
        result: postResult,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/deletePost/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deletePost(id);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "post has been deleted",
      });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
