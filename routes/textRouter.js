import { Router } from "express";
import { getText, postText } from "../controllers/textController.js";
import { validateTextSchema } from "../middlewares/validateTextMiddlewares.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const textRouter = Router();

textRouter.get("/texts", validateTokenMiddleware, getText);

textRouter.post(
  "/texts",
  validateTokenMiddleware,
  validateTextSchema,
  postText
);

export default textRouter;
