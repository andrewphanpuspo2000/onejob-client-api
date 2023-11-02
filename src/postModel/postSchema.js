import mongoose, { mongo } from "mongoose";

const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    fileType: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("post", postSchema);
