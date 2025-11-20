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
import { Spinner } from "../ui/spinner";
import CustomAlert from "../CustomAlert";
import { CreateProductDialogProps } from "@/types/products.dialogs";

export default function CreateProductDialog(props: CreateProductDialogProps) {
  const closeModal = useModalStore((state) => state.closeCreateProductDialog);

  const {
    form,
    handleFormSubmit,
    clearForm,
    createProductLoading,
    createProductError,
  } = useCreateProductForm({
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
        {createProductError ? (
          <CustomAlert
            variant="destructive"
            title="Something Went Wrong"
            description="There was a problem connecting to the server. Your product wasn't created. Try again in a moment."
          />
        ) : null}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              closeModal();
              clearForm();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={createProductLoading}
            onClick={form.handleSubmit(handleFormSubmit)}
          >
            {createProductLoading ? (
              <Spinner className="w-24" />
            ) : (
              "Create Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
