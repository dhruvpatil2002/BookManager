import { z } from "zod";

export const bookStatusEnum = z.enum(["want-to-read", "reading", "completed"]);

export const createBookSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  tags: z.array(z.string().trim()).optional().default([]),
  status: bookStatusEnum.optional().default("want-to-read")
});

export const updateBookSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty").optional(),
  author: z.string().trim().min(1, "Author cannot be empty").optional(),
  tags: z.array(z.string().trim()).optional(),
  status: bookStatusEnum.optional()
});