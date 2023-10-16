import express from "express";
import {
  addCompany,
  findCompanyByFilter,
} from "../companyDbModel/companyQueries.js";
import { encryptPass } from "../bcryptjs/encrypt.js";
import { sendCompanyVerify } from "../email/companyEmail.js";
const router = express.Router();

router.post("/addCompany", async (req, res, next) => {
  try {
    req.body.established = req.body.established.split("\n");
    req.body.mission = req.body.mission.split("\n");
    const findEmail = await findCompanyByFilter({ email: req.body.email });
    if (!findEmail._id) {
      req.body.password = encryptPass(req.body.password);
      const result = await addCompany(req.body);
      if (result._id) {
        const emailResult = await sendCompanyVerify({
          email: result.email,
          name: result.fName,
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

export default router;
