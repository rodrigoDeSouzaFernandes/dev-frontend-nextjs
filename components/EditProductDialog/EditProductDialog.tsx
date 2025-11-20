"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { useModalStore } from "@/stores/useModalStore";
import { useEditProductForm } from "./hooks/useEditProductForm";
import EditProductDialogSkeleton from "./EditProductDialogSkeleton";
import { useEditProductDialog } from "./hooks/useEditProductDialog";
import { Spinner } from "../ui/spinner";
import ProductForm from "../ProductForm/ProductForm";
import CustomAlert from "../CustomAlert";
import { EditProductDialogProps } from "@/types/products.dialogs";

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
                <CustomAlert
                  variant="destructive"
                  title="Something Went Wrong"
                  description="We couldn't load the product data."
                />
                <DialogFooter>
                  <Button onClick={closeModal}>Close</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <ProductForm form={form} />
                {updateProductError ? (
                  <CustomAlert
                    variant="destructive"
                    title="Something Went Wrong"
                    description="We were unable to save your changes. Please try again in a few minutes."
                  />
                ) : null}
                <DialogFooter>
                  <Button
                    className="sm:mr-auto"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Reset Form
                  </Button>
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
                    disabled={updateProductLoading}
                    onClick={form.handleSubmit(handleFormSubmit)}
                  >
                    {updateProductLoading ? (
                      <Spinner className="w-24" />
                    ) : (
                      "Save Changes"
                    )}
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
