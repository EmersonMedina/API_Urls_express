import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validateRegister, register);

router.get("/login", validateLogin, login);

export default router;
