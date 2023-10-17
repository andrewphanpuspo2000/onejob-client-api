import express from "express";
import {
  addCompany,
  findCompanyAndUpdate,
  findCompanyByFilter,
} from "../companyDbModel/companyQueries.js";
import { encryptPass } from "../bcryptjs/encrypt.js";
import { sendCompanyVerify } from "../email/companyEmail.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

router.post("/addCompany", async (req, res, next) => {
  try {
    req.body.description = req.body.description.split("\n");
    req.body.mission = req.body.mission.split("\n");
    const findEmail = await findCompanyByFilter({ email: req.body.email });

    if (findEmail === null) {
      req.body.password = encryptPass(req.body.password);
      req.body.verificationCode = uuidv4();
      const result = await addCompany(req.body);
      console.log(result);
      if (result._id) {
        const linkVerification = `${process.env.WEB_DOMAIN}/account/employer/verification?e=${result.email}&c=${result.verificationCode}`;
        const emailResult = await sendCompanyVerify({
          email: result.email,
          name: result.owner,
          link: linkVerification,
        });
        if (emailResult === "success") {
          res.json({
            status: "success",
            message: "please check your email to activate account",
          });
        }
      } else {
        res.json({
          status: "error",
          message: "Account can not be created,please contact admin",
        });
      }
    } else {
      return res.json({
        status: "error",
        message: "Email has been used",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    const result = await findCompanyAndUpdate(req.body, {
      status: "active",
      verificationCode: "",
    });
    if (result?._id) {
      res.json({
        status: "success",
        message: "Account has been activated",
      });
    } else {
      res.json({
        status: "error",
        message: "Account has been verified",
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
