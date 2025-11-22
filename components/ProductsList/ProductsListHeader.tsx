"use client";

import React from "react";
import { useModalStore } from "@/stores/useModalStore";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function ProductsListHeader(): React.ReactElement {
  const openCreateProductModal = useModalStore(
    (store) => store.openCreateProductDialog
  );

  return (
    <section className="mb-6 flex">
      <h1 className="font-bold text-5xl">Products</h1>
      <Button className="ml-auto self-center" onClick={openCreateProductModal}>
        <Plus />
        Create New Product
      </Button>
    </section>
  );
}
