import answerSchema from "./answerSchema.js";

export const uploadAnswer = (answer) => {
  return answerSchema(answer).save();
};
export const getAnswerByFilter = (filter) => {
  return answerSchema.find(filter);
};
export const deleteAnswer = (id) => {
  return answerSchema.findByIdAndDelete(id);
};
