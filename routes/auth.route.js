import { Router } from "express";
import {
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

router.get("/logout", logout);

router.get("/refresh", requireRefreshToken, refreshToken);

export default router;
