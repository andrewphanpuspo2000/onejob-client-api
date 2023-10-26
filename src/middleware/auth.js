import { findCompanyByFilter } from "../companyDbModel/companyQueries.js";
import {
  employerAccessJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
} from "../jsonwebtoken/jwt.js";

export const authEmployer = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { email } = verifyAccessJWT(authorization);

    if (email) {
      const checkUser = await findCompanyByFilter({ email });
      if (checkUser._id && checkUser.status === "active") {
        checkUser.password = undefined;
        checkUser.refreshJWT = undefined;
        req.employerInfo = checkUser;
        next();
      } else {
        return res.json({
          status: "error",
          message: "Account does not exist or not activated",
        });
      }
    }
  } catch (err) {
    if (err.message.includes("jwt expired")) {
      err.statusCode = 400;
      err.message = "jwt expired";
      return next(err);
    }
    return next(err);
  }
};

export const newRefreshJwt = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const verify = verifyRefreshJWT(authorization);

    if (verify?.email) {
      const accessJWT = await employerAccessJWT(verify.email);
      if (accessJWT !== undefined) {
        return res.json({ status: "success", accessJWT });
      }
    }
  } catch (err) {
    if (err.message.includes("jwt expired")) {
      err.message = "refresh jwt expired";
      err.statusCode = 400;
      return next(err);
    }
    return next(err);
  }
};
