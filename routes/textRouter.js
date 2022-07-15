import { Router } from "express";
import {
  getText,
  deleteText,
  updateText,
} from "../controllers/textController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const textRouter = Router();

textRouter.get("/texts", validateTokenMiddleware, getText);
textRouter.put("/texts/:textId", validateTokenMiddleware, updateText);
textRouter.delete("/texts/:textId", validateTokenMiddleware, deleteText);

export default textRouter;
