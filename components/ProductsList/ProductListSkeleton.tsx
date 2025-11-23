import React from "react";
import ProductsListHeader from "./ProductsListHeader";
import { Skeleton } from "../ui/skeleton";

export default function ProductListSkeleton(): React.ReactElement {
  return (
    <>
      <ProductsListHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6">
        <Skeleton className="w-auto h-100" />
        <Skeleton className="w-auto h-100" />
        <Skeleton className="w-auto h-100" />
        <Skeleton className="w-auto h-100" />
        <Skeleton className="w-auto h-100" />
        <Skeleton className="w-auto h-100" />
        <Skeleton className="w-auto h-100" />
        <Skeleton className="w-auto h-100" />
      </div>
    </>
  );
}
