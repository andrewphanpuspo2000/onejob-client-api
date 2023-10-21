import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    companyId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: "",
    },
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
    jobDescription: {
      type: [String],
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
    note: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("tasks", taskSchema);
