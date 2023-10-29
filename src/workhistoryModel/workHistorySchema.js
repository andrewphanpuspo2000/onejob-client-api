import mongoose from "mongoose";

const workHistorySchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    startYear: {
      type: Number,
      required: true,
    },
    endMonth: {
      type: String,
      default: "",
    },
    endYear: {
      type: Number,
      default: null,
    },
    present: {
      type: String,
      default: "",
    },
    description: {
      type: [String],
      default: [],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("WorkHistory", workHistorySchema);
