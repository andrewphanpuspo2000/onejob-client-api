import jsonwebtoken from "jsonwebtoken";
import { addEmployerToken } from "../employerSessionModel/sessionModel.js";
import { findCompanyAndUpdate } from "../companyDbModel/companyQueries.js";

export const employerAccessJWT = async (email) => {
  const token = jsonwebtoken.sign({ email }, process.env.ACCESS_JWT, {
    expiresIn: "1m",
  });
  const addSession = await addEmployerToken({ token, associate: email });

  return token;
};
export const employerRefreshJWT = async (email) => {
  const token = jsonwebtoken.sign({ email }, process.env.REFRESH_JWT, {
    expiresIn: "24h",
  });
  const refreshJWT = await findCompanyAndUpdate(
    { email },
    { refreshJWT: token }
  );

  return token;
};

export const verifyAccessJWT = (token) => {
  return jsonwebtoken.verify(token, process.env.ACCESS_JWT);
};
export const verifyRefreshJWT = (token) => {
  return jsonwebtoken.verify(token, process.env.REFRESH_JWT);
};
