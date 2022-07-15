import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";

export function validateSignIn(req, res, next) {
  const validation = signInSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(
      validation.error.details.map((detail) => {
        return detail.message;
      })
    );
    return;
  }
  next();
}

export function validateSignUp(req, res, next) {
  const validation = signUpSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(
      validation.error.details.map((detail) => {
        return detail.message;
      })
    );
    return;
  }
  next();
}
