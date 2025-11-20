import { loginFormSchema } from "@/schemas/login/login.schema";
import z from "zod";

type LoginFormType = z.infer<typeof loginFormSchema>;
