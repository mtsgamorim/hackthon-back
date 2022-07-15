import { Router } from "express";
import { getText } from "../controllers/textController";

const textRouter = Router();

textRouter.get("/texts", getText);

export default textRouter;
