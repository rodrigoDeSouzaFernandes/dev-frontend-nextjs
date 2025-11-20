"use client";

import React from "react";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { useModalStore } from "@/stores/useModalStore";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

type ProductDetailsActionsProps = {};

export default function ProductDetailsActions(
  props: ProductDetailsActionsProps
) {
  const { id } = useParams();
  const openEditProductDialog = useModalStore(
    (store) => store.openEditProductDialog
  );
  const openRemovetProductDialog = useModalStore(
    (store) => store.openRemoveProductDialog
  );

  return (
    <div className="flex gap-3">
      <Button onClick={() => openEditProductDialog(Number(id))}>
        <Pencil className="w-4 h-4 mr-2" />
        Edit Product
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
          </AlertDialogHeader>

          <p className="text-muted-foreground mb-4">
            This action cannot be undone.
          </p>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => openRemovetProductDialog(Number(id))}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
