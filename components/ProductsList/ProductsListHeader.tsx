"use client";

import { useModalStore } from "@/stores/useModalStore";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function ProductsListHeader() {
  const openCreateProductModal = useModalStore(
    (store) => store.openCreateProductDialog
  );

  return (
    <section className="mb-6 flex">
      <h1 className="font-bold text-5xl">Produtos</h1>
      <Button className="ml-auto self-center" onClick={openCreateProductModal}>
        <Plus />
        Create New Product
      </Button>
    </section>
  );
}
