import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/lib/services/products.service";
import { Product } from "@/types/products";
import { toast } from "sonner";

interface UseEditProductDialogProps {
  productId: number;
}

export const useEditProductDialog = ({
  productId,
}: UseEditProductDialogProps) => {
  const shouldFetch = typeof productId === "number" && productId > 0;

  const getProductsById = async (id: number): Promise<Product> => {
    try {
      return await productsService.getById(id);
    } catch (error) {
      toast.error("Failed to fetch product");
      throw error;
    }
  };

  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => getProductsById(productId),
    enabled: shouldFetch,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  return { productData, isLoading, isError };
};
