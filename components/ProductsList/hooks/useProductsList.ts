import { productsService } from "@/lib/services/products.service";
import { Product } from "@/types/products";

interface ProductsListResponse {
  products: Product[];
  error: boolean;
}

const useProductsList = async (): Promise<ProductsListResponse> => {
  try {
    const products: Product[] = await productsService.getAll();
    return { products, error: false };
  } catch (error) {
    return { products: [], error: true };
  }
};

export default useProductsList;
