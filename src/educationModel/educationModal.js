import educationSchema from "./educationSchema.js";

export const addEducation = (data) => {
  return educationSchema(data).save();
};
