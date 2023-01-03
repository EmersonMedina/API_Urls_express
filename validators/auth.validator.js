import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("email", "Enter a valid email")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  body("password", "Enter a valid password")
    .trim()
    .notEmpty()
    .isStrongPassword()
    .withMessage("Password too weak"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("The passwords must match");
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      console.log("There are errors:");
      const errores = err.array();
      console.log(errores);
      res.status(400).json({ message: errores[0].msg });
    }
  },
];

export const validateLogin = [
  body("email", "Enter a valid email")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  body("password", "Email or password incorrect")
    .trim()
    .notEmpty()
    .isStrongPassword(),
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      console.log("There are errors:");
      const errores = err.array();
      console.log(errores);
      res.status(400).json({ message: errores[0].msg });
    }
  },
];
