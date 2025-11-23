"use client";
import React from "react";
import useProductsList from "./hooks/useProductsList";
import ProductCard from "../ProductCard/ProductCard";
import ProductsListHeader from "./ProductsListHeader";
import CustomAlert from "../CustomAlert";
import ProductListSkeleton from "./ProductListSkeleton";

export default function ProductsList(): React.ReactElement {
  const { products, isLoading, isError } = useProductsList();

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2">
        <CustomAlert
          variant="destructive"
          title="Something Went Wrong"
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
