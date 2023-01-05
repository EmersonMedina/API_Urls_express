import { Router } from "express";
import {
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validateRegister, register);

router.get("/login", validateLogin, login);

router.get("logout", logout);

router.get("/protected", requireToken);

router.get("/refresh", refreshToken);

export default router;
