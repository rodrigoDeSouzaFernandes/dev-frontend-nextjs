"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

import { Controller, useForm } from "react-hook-form";
import { useEditProductDialog } from "./useEditProductDialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { DollarSign } from "lucide-react";

type EditProductDialogProps = {
  open: boolean;
  productId: number;
};

export default function EditProductDialog(props: EditProductDialogProps) {
  const { form, handleFormSubmit, handleImageChange } = useEditProductDialog();

  return (
    <Dialog open={props.open}>
      <DialogContent>
        <DialogTitle>Edit product</DialogTitle>
        <DialogDescription>
          Edit the details of your product here.
        </DialogDescription>

        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <FieldGroup>
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
                    placeholder="Insert a description of the product"
                    autoComplete="off"
                    className="resize-none"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Input
                    type="file"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Insert a description of the product"
                    autoComplete="off"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, field)}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
