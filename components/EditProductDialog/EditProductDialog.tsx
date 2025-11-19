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
import { AlertCircleIcon, Trash } from "lucide-react";
import { formatPriceValue } from "@/utils/formatCurrency";
import { useModalStore } from "@/stores/useModalStore";
import { useEditProductForm } from "./hooks/useEditProductForm";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import EditProductDialogSkeleton from "./EditProductDialogSkeleton";
import { useEditProductDialog } from "./hooks/useEditProductDialog";
import { Spinner } from "../ui/spinner";
import ProductForm from "../ProductForm/ProductForm";

type EditProductDialogProps = {
  open: boolean;
  productId: number;
};

export default function EditProductDialog({
  productId,
  open,
}: EditProductDialogProps) {
  const closeModal = useModalStore((state) => state.closeEditProductDialog);

  const { productData, isLoading, isError } = useEditProductDialog({
    productId,
  });

  const {
    form,
    handleFormSubmit,
    resetForm,
    clearForm,
    updateProductLoading,
    updateProductError,
  } = useEditProductForm({
    productData,
    productId,
    closeModal,
  });

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        closeModal();
        clearForm();
      }}
    >
      <DialogContent className="max-h-[90vh] flex flex-col">
        <DialogTitle>Edit product</DialogTitle>
        {isLoading ? (
          <EditProductDialogSkeleton />
        ) : (
          <>
            <DialogDescription>
              Edit the details of your product here.
            </DialogDescription>

            {isError ? (
              <>
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Something went wrong</AlertTitle>
                  <AlertDescription className="mt-2">
                    We couldn’t load the product data.
                  </AlertDescription>
                  <AlertDescription>
                    Please try again in a moment.
                  </AlertDescription>
                </Alert>
                <DialogFooter>
                  <Button onClick={closeModal}>Close</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <ProductForm form={form} />
                {updateProductError ? (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Something Went Wrong</AlertTitle>
                    <AlertDescription>
                      We were unable to save your changes. Please try again.
                    </AlertDescription>
                  </Alert>
                ) : null}
                <DialogFooter>
                  <Button
                    className="mr-auto"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Reset Form
                  </Button>
                  <Button variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button
                    disabled={updateProductLoading}
                    onClick={form.handleSubmit(handleFormSubmit)}
                  >
                    {updateProductLoading ? <Spinner /> : "Save Changes"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
