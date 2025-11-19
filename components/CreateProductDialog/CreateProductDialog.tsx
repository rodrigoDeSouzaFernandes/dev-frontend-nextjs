"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Trash } from "lucide-react";
import { formatPriceValue } from "@/utils/formatCurrency";
import { useCreateProductForm } from "./hooks/useCreateProductForm";
import { useModalStore } from "@/stores/useModalStore";

type CreateProductDialogProps = {
  open: boolean;
};

export default function CreateProductDialog(props: CreateProductDialogProps) {
  const closeModal = useModalStore((state) => state.closeCreateProductDialog);

  const { form, handleFormSubmit, handleImageChange, clearForm } =
    useCreateProductForm({
      closeModal,
    });

  return (
    <Dialog
      open={props.open}
      onOpenChange={() => {
        closeModal();
        clearForm();
      }}
    >
      <DialogContent className="max-h-[90vh] flex flex-col">
        <DialogTitle>Create product</DialogTitle>
        <DialogDescription>
          Create the details of your product here.
        </DialogDescription>

        <form className="overflow-y-auto pb-4">
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
                        <img
                          src={imageUri}
                          alt="Product image"
                          className="object-contain w-full h-full"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            form.setValue("image", "");
                          }}
                          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
                          aria-label="Remove selected image"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
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
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button onClick={form.handleSubmit(handleFormSubmit)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
