import { z } from "zod";

export const postFormSchema = z.object({
  title: z.string().min(3, { message: "A title is required for the post." }),
  slug: z.string(),
  content: z.any()
});
