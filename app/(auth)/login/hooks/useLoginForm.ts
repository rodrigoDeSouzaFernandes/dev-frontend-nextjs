"use client";

import { loginFormSchema } from "@/schemas/login/login.schema";
import { LoginFormType } from "@/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const onSubmit = (data: LoginFormType) => {
    alert("form sent");
  };

  return { form, onSubmit };
};
