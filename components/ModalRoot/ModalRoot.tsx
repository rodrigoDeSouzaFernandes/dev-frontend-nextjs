"use client";

import React from "react";
import { useModalStore } from "@/stores/useModalStore";
import LoadingFallback from "../LoadingFallback";

const RemoveProductDialog = React.lazy(() => import("../RemoveProductDialog/"));

const EditProductDialog = React.lazy(() => import("../EditProductDialog/"));

const CreateProductDialog = React.lazy(() => import("../CreateProductDialog"));

export default function ModalRoot() {
  const removeProductDialogProps = useModalStore(
    (state) => state.removeProductDialog
  );
  const editProductDialogProps = useModalStore(
    (state) => state.editProductDialog
  );
  const createProductDialogProps = useModalStore(
    (state) => state.createProductDialog
  );

  return (
    <>
      {removeProductDialogProps.open && (
        <React.Suspense fallback={<LoadingFallback />}>
          <RemoveProductDialog {...removeProductDialogProps} />
        </React.Suspense>
      )}
      {editProductDialogProps.open && (
        <React.Suspense fallback={<LoadingFallback />}>
          <EditProductDialog {...editProductDialogProps} />
        </React.Suspense>
      )}
      {createProductDialogProps.open && (
        <React.Suspense fallback={<LoadingFallback />}>
          <CreateProductDialog {...createProductDialogProps} />
        </React.Suspense>
      )}
    </>
  );
}
