import educationSchema from "./educationSchema.js";

export const addEducation = (data) => {
  return educationSchema(data).save();
};

export const getEducationByFilter = (data) => {
  return educationSchema.find(data);
};

export const updateEducation=(filter,data)=>{
 return educationSchema.findOneAndUpdate(filter,data);
}

export const deleteEducation=(id)=>{
   return educationSchema.findByIdAndDelete(id);
}