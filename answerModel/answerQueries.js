import answerSchema from "./answerSchema.js";

export const uploadAnswer = (answer) => {
  return answerSchema(answer).save();
};
