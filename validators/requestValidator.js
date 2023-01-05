import { validationResult } from "express-validator";

export const validateRequest = async (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    console.log("There are errors:");
    const errores = err.array();
    console.log(errores);
    return res.status(400).json({ message: errores[0].msg });
  }
};
