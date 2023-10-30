import mongoose from "mongoose";

const educationSchema = mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
    },
    level: {
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
    achievements: {
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

export default mongoose.model("Education", educationSchema);
