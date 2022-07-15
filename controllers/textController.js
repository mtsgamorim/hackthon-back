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

export async function postText(req, res) {
  const { user } = res.locals;
  const body = req.body;
  try {
    await db.collection("texts").insertOne(body);
    res.sendStatus(201);
  } catch (error) {
    console.log("Erro no banco de dados", error);
    res.sendStatus(500);
    return;
  }
}

export async function updateText(req, res) {
  const { user } = res.locals;
  const { textId } = req.params;
  const { title, email, text, date } = req.body;

  try {
    const textExists = await db
      .collection("texts")
      .findOne({ _id: new ObjectId(textId), email: user.email });

    if (!textExists) {
      res.sendStatus(404);
      return;
    }

    await db
      .collection("texts")
      .updateOne(
        { _id: new ObjectId(textId) },
        { $set: { title, email, text, date } }
      );

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function deleteText(req, res) {
  const { user } = res.locals;
  const { textId } = req.params;

  try {
    const text = await db
      .collection("texts")
      .findOne({ _id: new ObjectId(textId), email: user.email });

    if (!text) {
      res.sendStatus(404);
      return;
    }

    await db.collection("texts").deleteOne({ _id: new ObjectId(text._id) });

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}
