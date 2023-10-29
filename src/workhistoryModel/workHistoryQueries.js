import workHistorySchema from "./workHistorySchema.js";
export const addWorkHistory = (data) => {
  return workHistorySchema(data).save();
};

export const findWorkHistory = (userid) => {
  return workHistorySchema.find(userid);
};
