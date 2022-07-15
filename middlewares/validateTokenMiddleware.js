import { ObjectId } from "mongodb";
import db from "../db.js";
import { verifyToken } from "../utils/tokenUtils.js";

async function validateTokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.sendStatus(401);
    return;
  }

  let session;

  try {
    session = verifyToken(token).session;
  } catch (error) {
    res.sendStatus(401);
    return;
  }

  try {
    const sessionExists = await db.collection("sessions").findOne({ session });

    if (!sessionExists) {
      res.sendStatus(401);
      return;
    }

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(sessionExists.userId) });

    res.locals = { user };

    next();
  } catch (error) {
    res.sendStatus(500);
  }
}

export default validateTokenMiddleware;
