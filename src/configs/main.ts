import compression from "compression";
import cors from "cors";
import express from "express";
import morgan from "morgan";
const app = express();

import router from "../routes/routes";

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(morgan("dev"));

app.use("/api/", router);

export { app };
