export type RemoveProductDialogProps = {
  open: boolean;
  productId: number;
  onSucces?: () => void;
};

export type EditProductDialogProps = {
  open: boolean;
  productId: number;
};

export type CreateProductDialogProps = {
  open: boolean;
};