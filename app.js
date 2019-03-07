import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import logger from "morgan";
//import router from './server/routes';

import authRouter from "./server/routes/auth";
import messageRouter from "./server/routes/messages";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.get("/", (req, res) => res.json({ message: "Hello world" }));

//Routers middleware config
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);

app.listen(process.env.PORT, () => {
  /* eslint-disable-next-line */
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;