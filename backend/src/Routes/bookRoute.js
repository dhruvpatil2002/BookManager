import express from "express";

import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getStats,
} from "../controllers/bookController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/vaildateMiddleware.js";
import {
  createBookSchema,
  updateBookSchema,
} from "../validation/bookValidation.js";

const router = express.Router();

router.get("/stats", protect, getStats);

router.get("/", protect, getBooks);

router.post(
  "/",
  protect,
  validateBody(createBookSchema),
  createBook
);

router.get("/:id", protect, getBookById);

router.put(
  "/:id",
  protect,
  validateBody(updateBookSchema),
  updateBook
);

router.delete("/:id", protect, deleteBook);

export default router;