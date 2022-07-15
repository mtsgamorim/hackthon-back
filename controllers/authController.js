import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

import db from "../db.js";
import { generateToken } from "../utils/tokenUtils.js";

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
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

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const emailInUse = await db.collection("users").findOne({ email });
    if (emailInUse) {
      res.sendStatus(409);
      return;
    }
    await db.collection("users").insertOne({
      name,
      email,
      password: hashPassword,
    });
    res.sendStatus(201);
    return;
  } catch (error) {
    console.log("Erro ao criar novo usuário!", error);
    res.sendStatus(500);
    return;
  }
}
