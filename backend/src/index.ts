import express from "express";
import { connectRedis, env } from "./configs";
import { connectDB } from "./configs";
import { errorHandler } from "./middlewares";
import { routeNotFound } from "./middlewares";
import authRouter from "./routes/auth.routes";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: env. CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

connectRedis();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

app.use(errorHandler);
app.use(routeNotFound);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
