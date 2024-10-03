import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config({
  path: ".env",
});

databaseConnection();
const app = express();

// middlewares
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// routes

app.use("/user", userRoute);
app.use("/tweet", tweetRoute);

// app.use("/home", (req, res) => {
//   return res.status(200).json({ message: "coming from backend" });
// });

app.listen(process.env.PORT, () => {
  console.log(`server is listenig on port ${process.env.PORT}`);
});
