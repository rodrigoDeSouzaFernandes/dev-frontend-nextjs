"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { useCreateProductForm } from "./hooks/useCreateProductForm";
import { useModalStore } from "@/stores/useModalStore";
import ProductForm from "../ProductForm/ProductForm";

type CreateProductDialogProps = {
  open: boolean;
};

export default function CreateProductDialog(props: CreateProductDialogProps) {
  const closeModal = useModalStore((state) => state.closeCreateProductDialog);

  const { form, handleFormSubmit, clearForm } = useCreateProductForm({
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
        <ProductForm form={form} />
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(handleFormSubmit)}>
            Create Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
