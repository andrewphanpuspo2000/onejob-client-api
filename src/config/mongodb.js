import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("database is connected");
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default mongoConnect;
