"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { useLoginForm } from "./hooks/useLoginForm";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const { form, onSubmit, showPassword, setShowPassword } = useLoginForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="example@email.com"
                autoComplete="off"
                maxLength={100}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                  autoComplete="off"
                  maxLength={100}
                />
                <Button
                  className="absolute right-1 bottom-0 !w-fit px-2 mb-[2px] rounded-s-lg "
                  variant="ghost"
                  type="button"
                  size="icon-sm"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full mt-4">Login</Button>
    </form>
  );
}
