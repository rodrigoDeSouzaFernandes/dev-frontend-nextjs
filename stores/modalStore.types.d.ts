import type { RemoveProductDialogProps } from "@/types/products.dialogs";

export type ModalStore = {
  removeProductDialog: RemoveProductDialogProps;
  openRemoveProductDialog: (productId: number) => void;
  closeRemoveProductDialog: () => void;

  editProductDialog: { open: boolean; productId: number };
  openEditProductDialog: (productId: number) => void;
  closeEditProductDialog: () => void;

  createProductDialog: { open: boolean };
  openCreateProductDialog: () => void;
  closeCreateProductDialog: () => void;
};
