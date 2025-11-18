import type { RemoveProductDialogProps } from "@/types/products.dialogs";

export type ModalStore = {
  removeProductDialog: RemoveProductDialogProps;
  openRemoveProductDialog: (productId: number) => void;
  closeRemoveProductDialog: () => void;
};