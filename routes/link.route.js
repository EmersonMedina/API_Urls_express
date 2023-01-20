import { Router } from "express";
import {
  createLink,
  deleteLink,
  getFilteredLinks,
  getLink,
  getLinks,
  getLongLink,
  UpdateLink,
} from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  validateFilterValue,
  validateLink,
  validateParams,
} from "../validators/links.validator.js";

const router = Router();

router.get("/limit/:startIn/:quantity", requireToken, getLinks);
router.get("/:id", requireToken, validateParams, getLink);
router.get(
  "/filter/:filterValue",
  requireToken,
  validateFilterValue,
  getFilteredLinks
);
router.get("/public/:id", validateParams, getLongLink);
router.post("/", requireToken, validateLink, createLink);
router.patch("/:id", requireToken, validateParams, validateLink, UpdateLink);
router.delete("/:id", requireToken, validateParams, deleteLink);

export default router;
