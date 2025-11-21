"use client";

import { loginFormSchema } from "@/schemas/login/login.schema";
import { Login, LoginFormType } from "@/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/lib/services/users.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { capitalizeFirst } from "@/utils/stringHelper";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export const useLoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    isPending,
    mutate: login,
  } = useMutation({
    mutationFn: UserService.login,
    onSuccess: (data) => {
      console.log(data);
      setCookie("next_store_token", data.token);
      router.replace("/products");
    },
    onError: (error: AxiosError) => {
      console.log(error);

      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : (error.response?.data as any)?.message ||
            "Network error. try again in a moment";

      toast.error(capitalizeFirst(message));
    },
  });

  const defaultValues = {
    email: "",
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
