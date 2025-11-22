"use client";

import React from "react";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";

import { useModalStore } from "@/stores/useModalStore";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailsActions(): React.ReactElement {
  const { id } = useParams();
  const router = useRouter();
  const openEditProductDialog = useModalStore(
    (store) => store.openEditProductDialog
  );
  const openRemoveProductDialog = useModalStore(
    (store) => store.openRemoveProductDialog
  );

  return (
    <div className="flex gap-3">
      <Button onClick={() => openEditProductDialog(Number(id))}>
        <Pencil className="w-4 h-4" />
        Edit Product
      </Button>

      <Button
        variant="destructive"
        onClick={() =>
          openRemoveProductDialog(Number(id), () => router.replace("/"))
        }
      >
        <Trash className="w-4 h-4" />
        Delete
      </Button>
    </div>
  );
}
