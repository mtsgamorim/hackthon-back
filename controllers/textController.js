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
