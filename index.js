import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import cookieParser from "cookie-parser";

const app = express();

const whiteList = [process.env.ORIGIN1];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }

      return callback(`Invalid by CORS; origin: ${origin}`);
    },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
