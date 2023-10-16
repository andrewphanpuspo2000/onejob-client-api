import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
      index: 1,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    established: {
      type: Date,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    mission: {
      type: [String],
      required: true,
    },
    hiring: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("company", companySchema);
