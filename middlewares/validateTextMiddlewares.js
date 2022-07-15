import { textSchema } from "../schemas/textSchemas.js";

export function validateTextSchema(req, res, next) {
  const validation = textSchema.validate(req.body, { abortEarly: false });
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
