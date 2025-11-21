import { loginFormSchema } from "@/schemas/login/login.schema";
import z from "zod";

type Login = {
  email: string;
  password: string;
};

type LoginFormType = z.infer<typeof loginFormSchema>;
