import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Product } from "@/types/products";
import { useCallback, useEffect } from "react";
import { formatPriceValue, parsePriceValue } from "@/utils/formatCurrency";
import { producFormSchema } from "@/schemas/product/product.schema";
import { useMutation } from "@tanstack/react-query";
import { productsService } from "@/lib/services/products.service";
import { toast } from "sonner";
import { generateFakeImageUrl } from "@/utils/generateFakeImageUrl";

interface UseCreateProductFormProps {
  closeModal: () => void;
}
export type ProductFormType = z.infer<typeof producFormSchema>;

export const useCreateProductForm = ({
  closeModal,
}: UseCreateProductFormProps) => {


  const form = useForm<ProductFormType>({
    resolver: zodResolver(producFormSchema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  });

  const clearForm = useCallback(() => {
    form.reset({
      title: "",
      category: "",
      price: "",
      description: "",
      image: "",
    });
  }, []);

    const {
    isPending: createProductLoading,
    isError: createProductError,
    mutate: createProduct,
  } = useMutation({
    mutationFn: productsService.create,
    onSuccess: () => {
      toast.success("Product created successfully.");
      closeModal();
      clearForm();
    },
  });

  async function handleFormSubmit(data: ProductFormType) {
    const product: Omit<Product, "id"> = {
      ...data,
      price: parsePriceValue(data.price),
      image: generateFakeImageUrl(data.image),
    };

    await createProduct(product);
  }

  return {
    handleFormSubmit,
    clearForm,
    form,
    createProductLoading,
    createProductError,
  };
};
