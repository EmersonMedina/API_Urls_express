import { Router } from "express";
import multer from "multer";
import path from "path";

import { validateUpdateUser } from "../validators/user.validator.js";
import { updateUserProfile } from "../controllers/user.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".svg" &&
      ext !== ".gif" &&
      ext !== ".jpeg"
    ) {
      req.hasError = true;
      callback(null, false, req.hasError);
    } else {
      callback(null, true);
    }
  },
});
const router = Router();

router.patch(
  "/updateProfile",
  requireToken,
  upload.single("imagen"),
  validateUpdateUser,
  updateUserProfile
);

export default router;
