import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoConnect from "./src/config/mongodb.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8002;
mongoConnect();
app.use(express.json());
app.use(cors());
app.use(morgan());
//call router
import companyRouter from "./src/router/companyRouter.js";
import taskRouter from "./src/router/taskRouter.js";
import logoRouter from "./src/router/logo.js"
app.use("/onejob/api/job/task", taskRouter);
app.use("/onejob/api/job/company", companyRouter);
app.use("/onejob/api/employer/logo", logoRouter);
app.use((error, req, res, next) => {
  const code = error.statusCode || 500;
  res.status(code).json({
    status: "error",
    message: error.message,
  });
});
app.listen(port, (err) => {
  err
    ? console.log(err.message)
    : console.log(`Server is running on port ${port}`);
});
