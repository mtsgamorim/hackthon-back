import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const jwtExpiration = process.env.JWT_EXPIRATION;
const jwtSecret = process.env.JWT_SECRET;

export function generateToken(payload) {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });

  return token;
}

export function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}
