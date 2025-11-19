import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/lib/services/products.service";
import { Product } from "@/types/products";

interface UseEditProductDialogProps {
  productId: number;
}

export const useEditProductDialog = ({
  productId,
}: UseEditProductDialogProps) => {
  const shouldFetch = typeof productId === "number" && productId > 0;

  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => productsService.getById(productId),
    enabled: shouldFetch,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  return { productData, isLoading, isError };
};
