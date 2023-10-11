import taskSchema from "./taskSchema.js";

export const addTask = (task) => {
  return taskSchema(task).save();
};

export const getTasks = () => {
  return taskSchema.find();
};