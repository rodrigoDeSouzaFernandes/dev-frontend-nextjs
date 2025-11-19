import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Product } from "@/types/products";
import { useCallback, useEffect } from "react";
import { formatPriceValue } from "@/utils/formatCurrency";
import { producFormSchema } from "@/schemas/product/product.schema";
import { useMutation } from "@tanstack/react-query";
import { productsService } from "@/lib/services/products.service";
import { toast } from "sonner";

interface UseEditProductFormProps {
  productData: Product | undefined;
}
export type ProductFormType = z.infer<typeof producFormSchema>;

export const useEditProductForm = ({
  productData,
}: UseEditProductFormProps) => {

  const {
    isPending,
    isError,
    mutate: updateProduct,
  } = useMutation({
    mutationFn: productsService.update,
    onSuccess: () => {
      toast.success("Product updated successfully.");
    },
  });


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

  function handleFormSubmit(data: ProductFormType) {
    console.log(data);
  }

  async function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof producFormSchema>, "image">
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      field.onChange("");
      e.target.value = "";
      form.setError("image", { message: "Only image files are allowed" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      field.onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const resetForm = useCallback((): void => {
    if (productData && form) {
      form.reset({
        title: productData.title,
        category: productData.category,
        price: formatPriceValue(productData.price.toString()),
        description: productData.description,
        image: productData.image,
      });
    }
  }, [productData, form]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return { form, handleFormSubmit, handleImageChange, resetForm };
};
