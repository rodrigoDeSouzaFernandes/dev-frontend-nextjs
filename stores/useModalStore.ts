"use client";

import { create } from "zustand";
import { ModalStore } from "./modalStore.types";



export const useModalStore = create<ModalStore>((set) => ({
  removeProductDialog: { open: false, productId: 0 },
  openRemoveProductDialog: (productId: number) =>
    set(() => ({ removeProductDialog: { open: true, productId } })),
  closeRemoveProductDialog: () =>
    set(() => ({ removeProductDialog: { open: false, productId: 0 } })),
}));
