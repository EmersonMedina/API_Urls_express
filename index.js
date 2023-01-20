import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }

      return callback(`Invalid by CORS; origin: ${origin}`);
    },
    credentials: true,
  })
);
//Habilitar body parser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
