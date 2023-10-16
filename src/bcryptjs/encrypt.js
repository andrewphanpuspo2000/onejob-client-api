import bcryptjs from "bcryptjs";

export const encryptPass = (pass) => {
  const salt = 10;
  return bcryptjs.hashSync(pass, salt);
};
