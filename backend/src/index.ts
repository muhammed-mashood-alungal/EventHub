import express from "express";
import { connectRedis, env } from "./configs";
import { connectDB } from "./configs";
import { errorHandler } from "./middlewares";
import { routeNotFound } from "./middlewares";
import morgan from "morgan";
import cors from "cors";
import { authRouter, eventRouter, ticketRouter } from "./routes";

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
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/tickets", ticketRouter);

app.use(errorHandler);
app.use(routeNotFound);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
