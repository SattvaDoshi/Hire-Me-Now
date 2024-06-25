import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import morgan from "morgan";

const app = express();
config();

app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/user", userRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);
dbConnection();

app.use(errorMiddleware);
export default app;
