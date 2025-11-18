"use client";

import { ModalTypes } from "@/types/modaltypes";
import { create } from "zustand";

type ModalStore = {
  modalType: keyof ModalTypes | null;
  modalProps: ModalTypes[keyof ModalTypes] | null;
  openModal: <T extends keyof ModalTypes>(
    type: T,
    props: ModalTypes[T]
  ) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalType: null,
  modalProps: null,
  openModal: (type, props) => set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: null, modalProps: null }),
}));
