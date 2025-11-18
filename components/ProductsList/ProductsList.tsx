import React, { use } from "react";
import useProductsList from "./useProductsList";
import ProductCard from "../ProductCard/ProductCard";

type ProductsListProps = {};

export default async function ProductsList(props: ProductsListProps) {
  const { products } = await useProductsList();

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
