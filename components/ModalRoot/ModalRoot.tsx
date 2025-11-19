"use client";

import React from "react";
import { useModalStore } from "@/stores/useModalStore";
import LoadingFallback from "../LoadingFallback/LoadingFallback";

const RemoveProductDialog = React.lazy(
  () => import("../RemoveProductDialog/RemoveProductDialog")
);

const EditProductDialog = React.lazy(
  () => import("../EditProductDialog/EditProductDialog")
);

export default function ModalRoot() {
  const removeProductDialogProps = useModalStore(
    (state) => state.removeProductDialog
  );
  const editProductDialogProps = useModalStore(
    (state) => state.editProductDialog
  );

  return (
    <>
      <React.Suspense fallback={<LoadingFallback />}>
        <RemoveProductDialog {...removeProductDialogProps} />
      </React.Suspense>
      <React.Suspense fallback={<LoadingFallback />}>
        <EditProductDialog {...editProductDialogProps} />
      </React.Suspense>
    </>
  );
}
