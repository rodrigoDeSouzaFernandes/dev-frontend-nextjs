"use client";

import { loginFormSchema } from "@/schemas/login/login.schema";
import { Login, LoginFormType } from "@/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { usersService } from "@/lib/services/users.service";
import { toast } from "sonner";
import { capitalizeFirst } from "@/utils/stringHelper";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { ApiError } from "@/types/api";
import { UseLoginFormReturn } from "@/types/hooks";

export const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { isPending, mutate: login } = useMutation({
    mutationFn: usersService.login,
    onSuccess: (data) => {
      setCookie("token", data.token);
      router.replace("/products");
    },
    onError: (error: ApiError) => {
      const errorData = error.response?.data;
      const message =
        typeof errorData === "string"
          ? errorData
          : errorData?.message || errorData?.error ||
            "Network error. try again in a moment";

      toast.error(capitalizeFirst(message));
    },
  });

  const defaultValues = {
    username: "",
    password: "",
  };

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: LoginFormType) => {
    const payload: Login = data;
    await login(payload);
  };

  return { form, onSubmit, showPassword, setShowPassword, isPending };
};
