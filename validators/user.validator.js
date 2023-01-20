import { body } from "express-validator";
import { validateRequest } from "./requestValidator.js";

export const validateUpdateUser = [
  body("name", "Enter a valid name").trim().notEmpty(),
  validateRequest,
];
