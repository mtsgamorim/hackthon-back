import { Router } from "express";
import { signIn } from "../controllers/authController.js";
import {
  validateSignIn,
  validateSignUp,
} from "../middlewares/validateAuthMiddlewares.js";

const authRouter = Router();

authRouter.post("/sign-in", validateSignIn, signIn);

authRouter.post("/sign-up", validateSignUp);

export default authRouter;
