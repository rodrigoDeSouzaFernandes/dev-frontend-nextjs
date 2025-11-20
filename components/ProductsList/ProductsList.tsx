import useProductsList from "./hooks/useProductsList";
import ProductCard from "../ProductCard/ProductCard";
import { AlertTriangleIcon } from "lucide-react";
import ProductsListHeader from "./ProductsListHeader";
import CustomAlert from "../CustomAlert";

type ProductsListProps = {};

export default async function ProductsList(props: ProductsListProps) {
  const { products, error } = await useProductsList();

  if (error) {
    return (
      <div className="flex items-center gap-2">
        <AlertTriangleIcon className="h-5" />
        <CustomAlert
          variant="destructive"
          title="Somehing Went Wrong"
          description="We were unable to load the products at this time. This may be due to a temporary network issue on your side or a problem with our servers. Please check your connection and try again in a few minutes."
        />
      </div>
    );
  }

  return (
    <>
      <ProductsListHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={`product-${product.title}-${index}`}
            product={product}
          />
        ))}
      </div>
    </>
  );
}
