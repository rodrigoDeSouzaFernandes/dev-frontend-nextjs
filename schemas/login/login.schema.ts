import * as z from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .nonempty("Please enter your username")
    .min(3, "Username must have at least 3 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must have at least 6 characters"),
});
