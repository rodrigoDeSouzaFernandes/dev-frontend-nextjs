import { productsService } from "@/lib/services/products.service";
import { Product } from "@/types/products";
import { UseProductDetailsReturn } from "@/types/hooks";
import { useQuery } from "@tanstack/react-query";

interface UseProductDetailsProps {
  productId: number;
}

export const useProductDetails = ({
  productId,
}: UseProductDetailsProps): UseProductDetailsReturn => {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<Product, Error>({
    queryKey: ["product"],
    queryFn: () => productsService.getById(productId),
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  return { product: product, isLoading, isError };
};
