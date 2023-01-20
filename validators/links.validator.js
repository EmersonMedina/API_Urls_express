import axios from "axios";
import { body, param } from "express-validator";
import { validateRequest } from "./requestValidator.js";

export const validateLink = [
  body("name", "Enter a valid name").trim().notEmpty(),
  body("longLink", "Enter a valid link")
    .trim()
    .notEmpty()
    .isURL()
    .custom(async (value) => {
      try {
        if (!value.startsWith("https://"))
          throw new Error("The url is not secure");

        await axios.get(value);
      } catch (error) {
        throw new Error("The url is not valid");
      }
      return true;
    }),
  validateRequest,
];

export const validateParams = [
  param("id", "Invalid parameter id").trim().notEmpty().escape(),
  validateRequest,
];

export const validateFilterValue = [
  param("filterValue", "Invalid Filter Value").trim().notEmpty().escape(),
  validateRequest,
];
