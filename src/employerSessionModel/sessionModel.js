import employerSession from "./sessionSchema.js";

export const addEmployerToken = (token) => {
  return employerSession(token).save();
};
