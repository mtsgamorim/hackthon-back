import joi from "joi";

export const textSchema = joi.object({
  title: joi.string().required(),
  email: joi.string().email().required(),
  text: joi.string().required(),
  date: joi
    .string()
    .pattern(/^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/)
    .required(),
});
