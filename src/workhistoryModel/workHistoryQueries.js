import workHistorySchema from "./workHistorySchema.js";
export const addWorkHistory = (data) => {
  return workHistorySchema(data).save();
};

export const findWorkHistory = (userid) => {
  return workHistorySchema.find(userid);
};

export const deleteWorkHistory = (id) => {
  return workHistorySchema.findByIdAndDelete(id);
};

export const updateWorkHistory = (filter, data) => {
  return workHistorySchema.findOneAndUpdate(filter, data);
};
