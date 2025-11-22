import { UseFormReturn } from "react-hook-form";
import { Product, ProductFormType } from "./products";
import { LoginFormType } from "./login";

export interface UseCreateProductFormReturn {
  form: UseFormReturn<ProductFormType>;
  handleFormSubmit: (data: ProductFormType) => Promise<void>;
  clearForm: () => void;
  createProductLoading: boolean;
  createProductError: boolean;
}

export interface UseEditProductFormReturn {
  form: UseFormReturn<ProductFormType>;
  handleFormSubmit: (data: ProductFormType) => Promise<void>;
  resetForm: () => void;
  clearForm: () => void;
  updateProductLoading: boolean;
  updateProductError: boolean;
}

export interface UseEditProductDialogReturn {
  productData: Product | undefined;
  isLoading: boolean;
  isError: boolean;
}

export interface UseLoginFormReturn {
  form: UseFormReturn<LoginFormType>;
  onSubmit: (data: LoginFormType) => Promise<void>;
  showPassword: boolean;
  setShowPassword: (value: boolean | ((prev: boolean) => boolean)) => void;
  isPending: boolean;
}

export interface UseProductDetailsReturn {
  product: Product | null;
  error: boolean;
}

export interface UseRemoveProductDialogReturn {
  isPending: boolean;
  isError: boolean;
  deleteProduct: (id: number) => void;
}
