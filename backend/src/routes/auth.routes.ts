import { Router } from "express";
import { validateSchema } from "../middlewares";
import { signinSchema, signupSchema } from "../schemas";
import { UserRepository } from "../repositories";
import { AuthService } from "../services";
import { AuthController } from "../controllers";

const authRouter = Router();

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

authRouter.post(
  "/signup",
  validateSchema(signupSchema),
  authController.signup.bind(authController)
);
authRouter.post(
  "/signin",
  validateSchema(signinSchema),
  authController.signin.bind(authController)
);

export default authRouter;
