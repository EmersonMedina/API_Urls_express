import { Router } from "express";
import {
  createLink,
  deleteLink,
  getLink,
  getLinks,
  UpdateLink,
} from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { validateLink, validateParams } from "../validators/links.validator.js";

const router = Router();

router.get("/", requireToken, getLinks);
router.get("/:id", requireToken, validateParams, getLink);
router.post("/", requireToken, validateLink, createLink);
router.patch("/:id", requireToken, validateParams, validateLink, UpdateLink);
router.delete("/:id", requireToken, validateParams, deleteLink);

export default router;
