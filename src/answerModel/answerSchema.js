import mongoose from "mongoose";

const answerSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: 1,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    text: {
      type: [String],
    },
    file: {
      type: String,
    },
    links: {
      type: [String],
    },
    taskId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    answerType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("answer", answerSchema);
