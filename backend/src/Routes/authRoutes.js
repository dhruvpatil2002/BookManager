import express from "express";
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/vaildateMiddleware.js";
import { registerSchema, loginSchema } from "../validation/authValidation.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), registerUser);
router.post("/login", validateBody(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

export default router;