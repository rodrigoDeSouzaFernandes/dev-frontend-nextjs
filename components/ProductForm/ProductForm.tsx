import React from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
  Controller,
  ControllerRenderProps,
  UseFormReturn,
} from "react-hook-form";
import { Input } from "../ui/input";
import { ProductFormType } from "@/types/products";
import { formatPriceValue } from "@/utils/formatCurrency";
import { Textarea } from "../ui/textarea";
import { Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

type ProductFormProps = {
  form: UseFormReturn<ProductFormType>;
};

export default function ProductForm({
  form,
}: ProductFormProps): React.ReactElement {
  async function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<ProductFormType, "image">
  ): Promise<void> {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      field.onChange("");
      e.target.value = "";
      form.setError("image", { message: "Only image files are allowed" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = (): void => {
      if (typeof reader.result === "string") {
        field.onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <form className="overflow-y-auto pb-4">
      <FieldGroup className="gap-4">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Product title"
                autoComplete="off"
                maxLength={100}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>Category</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Product category"
                autoComplete="off"
                maxLength={50}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>Price</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="$ 00,00"
                autoComplete="off"
                inputMode="decimal"
                pattern="[0-9]*"
                maxLength={15}
                onBeforeInput={(e) => {
                  const char = e.data;
                  const pattern = /[0-9]/;
                  if (char && !pattern.test(char)) {
                    e.preventDefault();
                  }
                  return;
                }}
                onChange={(e) => {
                  field.onChange(formatPriceValue(e.target.value));
                }}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Insert a description of the product  here"
                autoComplete="off"
                className="resize-none"
                maxLength={500}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => {
            const imageUri = form.getValues("image");

            return (
              <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor={field.name}>Image</FieldLabel>

                {imageUri ? (
                  <div className="relative w-40 h-40 rounded-lg overflow-hidden border bg-muted">
                    <div className="relative min-h-40 h-[100%]">
                      <Image
                        src={imageUri}
                        fill
                        alt="Product image"
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, 460px"
                      />
                    </div>

                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        form.setValue("image", "");
                      }}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 hover:text-white text-white"
                      aria-label="Remove selected image"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, field)}
                  />
                )}
                <FieldError errors={[fieldState.error]} />
              </Field>
            );
          }}
        />
      </FieldGroup>
    </form>
  );
}
