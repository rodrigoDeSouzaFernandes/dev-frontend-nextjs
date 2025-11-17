import { productsService } from "@/lib/services/products.service";

const useProductsList = async () => {
  const products = await productsService.getAll();

  return { products };
};

export default useProductsList;
