import { Router } from "express";
import {
  validateSignIn,
  validateSignUp,
} from "../middlewares/validateAuthMiddlewares.js";

const authRouter = Router();

authRouter.post("/sign-in", validateSignIn);

authRouter.post("/sign-up", validateSignUp);

export default authRouter;
