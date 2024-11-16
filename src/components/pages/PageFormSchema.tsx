import { z } from "zod";

export const pageFormSchema = z.object({
  title: z.string().min(3, { message: "A title is required for the page." }),
  slug: z.string(),
  route: z
    .string()
    .min(2, { message: "A route is required for the page." })
    .refine(
      (value) => {
        const routeRegex = /^(\/[a-zA-Z0-9-]+)*(\/)?$/;
        return routeRegex.test(value) && !value.includes("//");
      },
      {
        message:
          "Invalid route. Ensure it starts with '/', contains only alphanumeric characters, hyphens, and does not have consecutive or trailing slashes."
      }
    ),
  content: z.any()
});
