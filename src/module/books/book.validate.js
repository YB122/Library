import joi from "joi";

export const createBookValidate = joi.object({
  title: joi.string().required().min(1).max(200),
  author: joi.string().required().min(1).max(100),
  publishedYear: joi.number().required().integer().min(1000).max(new Date().getFullYear() + 1),
  availableCopies: joi.number().optional().integer().min(0).default(1),
  urlImage: joi.string().optional().uri().allow(""),
  description: joi.string().required(),
  rating: joi.number().required(),
});

export const editBookValidate = joi.object({
  title: joi.string().optional().min(1).max(200),
  author: joi.string().optional().min(1).max(100),
  publishedYear: joi.number().optional().integer().min(1000).max(new Date().getFullYear() + 1),
  availableCopies: joi.number().optional().integer().min(0),
  urlImage: joi.string().optional().uri().allow(""),
  description: joi.string().optional(),
  rating: joi.number().optional(),
});