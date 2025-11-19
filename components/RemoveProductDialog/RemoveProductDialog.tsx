"use client";
import React from "react";

import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import useRemoveProductDialog from "./hooks/useRemoveProductDialog";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { RemoveProductDialogProps } from "@/types/products.dialogs";
import { useModalStore } from "@/stores/useModalStore";
import { Spinner } from "../ui/spinner";

function RemoveProductDialog({ productId, open }: RemoveProductDialogProps) {
  const closeModal = useModalStore((state) => state.closeRemoveProductDialog);

  const { isPending, isError, deleteProduct } = useRemoveProductDialog({
    closeModal,
  });

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product data from our servers.
          </AlertDialogDescription>
          {isError ? (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle />
              <AlertDescription>
                There was an error while trying to remove the product. Please
                try again.
              </AlertDescription>
            </Alert>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={closeModal}>
            Cancel
          </AlertDialogCancel>

          <Button
            disabled={isPending}
            className="bg-red-700 text-white hover:bg-red-600 cursor-pointer sm:w-32"
            onClick={() => deleteProduct(productId)}
          >
            {isPending ? <Spinner /> : "Delete product"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default React.memo(RemoveProductDialog);
