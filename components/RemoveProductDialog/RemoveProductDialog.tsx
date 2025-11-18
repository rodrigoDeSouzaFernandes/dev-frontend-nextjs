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
import useRemoveProductDialog from "./useRemoveProductDialog";
import { AlertTriangle, LoaderIcon } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

type RemoveProductDialogProps = {
  productId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function RemoveProductDialog({
  productId,
  open,
  setOpen,
}: RemoveProductDialogProps) {
  const { isPending, isError, deleteProduct } = useRemoveProductDialog();

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product data from our servers.
          </AlertDialogDescription>
          {isError && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle />
              <AlertDescription>
                There was an error while trying to remove the product. Please
                try again.
              </AlertDescription>
            </Alert>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </AlertDialogCancel>

          <Button
            disabled={isPending}
            className="bg-red-700 text-white hover:bg-red-600 cursor-pointer sm:w-32"
            onClick={() => deleteProduct(productId)}
          >
            {isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Delete product"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default React.memo(RemoveProductDialog);