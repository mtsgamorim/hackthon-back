import { ObjectId } from "mongodb";

import db from "../db.js";

export async function getText(req, res) {
  const { user } = res.locals;
  try {
    const texts = await db
      .collection("texts")
      .find({ email: user.email })
      .toArray();
    res.send(texts);
  } catch (error) {
    console.log("Erro no banco de dados", error);
    res.sendStatus(500);
    return;
  }
}
