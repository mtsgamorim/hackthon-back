import { Router } from "express";
import { getText } from "../controllers/textController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const textRouter = Router();

textRouter.get("/texts", validateTokenMiddleware, getText);

export default textRouter;
