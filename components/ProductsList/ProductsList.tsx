  import React, { use } from "react";
  import useProductsList from "./useProductsList";
  import ProductCard from "../ProductCard/ProductCard";
  import { AlertCircleIcon, AlertTriangleIcon } from "lucide-react";

  type ProductsListProps = {};

  export default async function ProductsList(props: ProductsListProps) {
    const { products, error } = await useProductsList();

    if (error) {
      return (
        <div className="flex items-center gap-2">

          <AlertTriangleIcon className="h-5" />
        <p className="pt-4 pb-4">
          Houve uma instabilidade no servidor e não foi possível carregar os
          produtos. tente novamente mais tarde.
        </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={`product-${product.title}-${index}`}
            product={product}
          />
        ))}
      </div>
    );
  }
