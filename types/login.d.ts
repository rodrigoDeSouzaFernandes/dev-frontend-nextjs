import { loginFormSchema } from "@/schemas/login/login.schema";
import z from "zod";

export interface Login {
  email: string;
  password: string;
}

export type LoginFormType = z.infer<typeof loginFormSchema>;
