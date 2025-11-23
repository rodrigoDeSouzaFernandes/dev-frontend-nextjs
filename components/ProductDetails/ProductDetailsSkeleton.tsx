import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function ProductDetailsSkeleton(): React.ReactElement {
  return (
    <main className="max-w-[1400px] m-auto p-4 pt-8">
      <section className="grid grid-cols-1 grid-rows-2 sm:grid-rows-auto lg:grid-cols-2 gap-10 mt-">
        <Skeleton className="w-full h-100" />
        <Skeleton />
      </section>
    </main>
  );
}
