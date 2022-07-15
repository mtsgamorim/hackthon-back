import dotenv from "dotenv";

dotenv.config();

function generateToken(payload) {
  const jwtExpiration = process.env.JWT_EXPIRATION;
  const jwtSecret = process.env.JWT_SECRET;

  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });

  return token;
}

export default generateToken;
