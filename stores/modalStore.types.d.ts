import type {
  EditProductDialogProps,
  RemoveProductDialogProps,
} from "@/types/products.dialogs";

export type ModalStore = {
  removeProductDialog: RemoveProductDialogProps;
  openRemoveProductDialog: (productId: number, onSucces?: () => void) => void;
  closeRemoveProductDialog: () => void;

  editProductDialog: EditProductDialogProps;
  openEditProductDialog: (productId: number) => void;
  closeEditProductDialog: () => void;

  createProductDialog: { open: boolean };
  openCreateProductDialog: () => void;
  closeCreateProductDialog: () => void;
};
