import { Router } from "express";
import {
  getText,
  postText,
  updateText,
  deleteText,
} from "../controllers/textController.js";
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
textRouter.put(
  "/texts/:textId",
  validateTokenMiddleware,
  validateTextSchema,
  updateText
);
textRouter.delete(
  "/texts/:textId",
  validateTokenMiddleware,
  validateTextSchema,
  deleteText
);

export default textRouter;
