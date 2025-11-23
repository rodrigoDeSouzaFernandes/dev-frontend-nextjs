import { productsService } from "@/lib/services/products.service";
import { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

interface ProductsListResponse {
  products: Product[];
  isError: boolean;
  isLoading: boolean;
}

const useProductsList = (): ProductsListResponse => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ["product"],
    queryFn: productsService.getAll,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  return { products: products || [], isLoading, isError };
};

export default useProductsList;
