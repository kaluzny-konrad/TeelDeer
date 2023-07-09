import { z } from "zod";

export const EditorValidator = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must be minimum 3 characters long" })
    .max(128, { message: "Title must be at least 128 characters" }),
  content: z.any(),
});

export type EditorCreationRequest = z.infer<typeof EditorValidator>;
