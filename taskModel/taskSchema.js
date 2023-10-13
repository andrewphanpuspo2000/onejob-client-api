import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    taskTitle: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    salaryFrom: {
      type: Number,
      required: true,
    },
    salaryTo: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: [String],
      required: true,
    },
    toDo: {
      type: [String],
      required: true,
    },
    contractLength: {
      type: String,
    },
    responsibilities: {
      type: [String],
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("tasks", taskSchema);
