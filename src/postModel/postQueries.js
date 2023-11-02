import postSchema from "./postSchema.js";

export const addPost = (data) => {
  return postSchema(data).save();
};
