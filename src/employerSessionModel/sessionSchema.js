import mongoose from "mongoose";

const employerSession = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    associate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("employerSession", employerSession);
