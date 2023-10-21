import taskSchema from "./taskSchema.js";

export const addTask = (task) => {
  return taskSchema(task).save();
};

export const getTasks = () => {
  return taskSchema.find();
};

export const getTaskById = (id) => {
  return taskSchema.findById(id);
};

export const getTasksByFilter = (data) => {
  return taskSchema.find(data);
};
