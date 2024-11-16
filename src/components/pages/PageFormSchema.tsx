import { z } from "zod";

export const pageFormSchema = z.object({
  title: z.string().min(3, { message: "A title is required for the page." }),
  slug: z.string(),
  route: z.string().min(3, { message: "A route is required for the page." }),
  content: z.any()
});
