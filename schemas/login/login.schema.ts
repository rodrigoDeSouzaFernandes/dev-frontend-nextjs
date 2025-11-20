import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must have at least 6 characters"),
});
