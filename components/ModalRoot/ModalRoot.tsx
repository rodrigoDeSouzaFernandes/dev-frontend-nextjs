"use client";

import { useModalStore } from "@/stores/useModalStore";
import { ModalTypes } from "@/types/modaltypes";
import { RemoveProductDialogProps } from "@/types/products.dialogs";
import React, { useState } from "react";

const RemoveProductDialog = React.lazy(
  () => import("../RemoveProductDialog/RemoveProductDialog")
);

const ModalComponents: Record<keyof ModalTypes, React.FC<any>> = {
  "removeProduct": RemoveProductDialog,
//   "editProduct": <p>oi</p> as unknown as React.FC<any>,
};

export default function ModalRoot() {
  const { modalType, modalProps, closeModal } = useModalStore();

  if (!modalType) return null;

  const Modal = ModalComponents[modalType];

  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Modal {...modalProps as ModalTypes[typeof modalType]} />
      </React.Suspense>
    </>
  );
}   
