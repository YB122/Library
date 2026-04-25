import joi from "joi";

export const registerValidate = joi.object({
  name: joi.string().required().min(3).max(50),
  email: joi.string().required().min(3).max(100),
  password: joi.string().required().min(8).max(30),
  confirmPassword: joi.string().required().min(8).max(30).valid(joi.ref("password")),
  role: joi.string().optional().valid("member", "admin"),
});

export const loginValidate = joi.object({
  email: joi.string().required().min(3).max(100),
  password: joi.string().required().min(8).max(30),
});

