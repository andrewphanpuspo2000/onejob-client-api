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
    req.body.description = req.body.description.split("\n");
    req.body.mission = req.body.mission.split("\n");
    const findEmail = await findCompanyByFilter({ email: req.body.email });

    if (findEmail === null) {
      req.body.password = encryptPass(req.body.password);
      const result = await addCompany(req.body);
      console.log(result);
      if (result._id) {
        const emailResult = await sendCompanyVerify({
          email: result.email,
          name: result.owner,
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
