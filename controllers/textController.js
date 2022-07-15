import { ObjectId } from "mongodb";

import db from "../db.js";

export async function getText(req, res) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  try {
    const findUser = await db.collection("sessions").findOne({ token });
    console.log(findUser);
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(findUser.userId) });
    console.log(user);
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
