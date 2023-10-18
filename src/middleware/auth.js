import { findCompanyByFilter } from "../companyDbModel/companyQueries.js";
import { verifyAccessJWT } from "../jsonwebtoken/jwt.js";

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
