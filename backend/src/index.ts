import express from "express";
import { env } from "./configs";
import { connectDB } from "./configs";
import { errorHandler } from "./middlewares";
import { routeNotFound } from "./middlewares";
import authRouter from "./routes/auth.routes";

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

app.use(errorHandler);
app.use(routeNotFound);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
