import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

import db from "../db.js";
import generateToken from "../utils/generateToken.js";

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user || bcrypt.compareSync(password, user.password)) {
      res.sendStatus(401);
      return;
    }

    const session = uuid();

    await db
      .collection("sessions")
      .deleteMany({ userId: new ObjectId(user._id) });

    await db.collection("sessions").insertOne({ session, userId: user._id });

    const token = generateToken({ session });

    res.send({
      token,
      name: user.name,
    });
  } catch (error) {
    console.log("Erro ao logar usuário", error);
    res.sendStatus(500);
  }
}
