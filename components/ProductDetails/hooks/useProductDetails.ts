import { productsService } from "@/lib/services/products.service";
import { Product } from "@/types/products";

interface UseProductDetailsProps {
  productId: number;
}

export const useProductDetails = async ({
  productId,
}: UseProductDetailsProps) => {
  try {
    const product: Product = await productsService.getById(productId);
    return { product, error: false };
  } catch (error) {
    return { product: null, error: true };
  }
};
