"use client";

import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { DropdownMenu } from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Product } from "@/types/products";
import { useModalStore } from "@/stores/useModalStore";
import { formatPriceValue } from "@/utils/formatCurrency";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product: { title, description, image, price, id },
}: ProductCardProps): React.ReactElement {
  const router = useRouter();
  const openRemoveProductDialog = useModalStore(
    (state) => state.openRemoveProductDialog
  );
  const openEditProductDialog = useModalStore(
    (state) => state.openEditProductDialog
  );

  return (
    <Card className="relative grid grid-rows-[1fr_auto_auto] ">
      <CardHeader className="flex-1 ">
        <CardTitle title={title} className="mr-4 sm:line-clamp-1">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
        <CardAction></CardAction>
      </CardHeader>

      <div className="absolute top-0 right-0 m-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button variant="ghost" size="icon" data-testid="open-card-actions">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-popover text-popover-foreground border border-border rounded-md shadow-md w-30 cursor-pointer"
          >
            <DropdownMenuItem
              className="p-2 hover:bg-gray-100"
              onClick={() => {
                openEditProductDialog(id);
              }}
              data-testid="open-edit-product-dialog"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-2 hover:bg-red-50 hover:text-red-600"
              onClick={() => {
                openRemoveProductDialog(id);
              }}
              data-testid="open-remove-product-dialog"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent className="mt-auto">
        <div className="relative min-h-40 h-60 max-h-60 h-[100%] sm:h-60 m-auto">
          <Image
            src={image}
            alt={`Image of ${title}`}
            className="object-contain"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <p className="w-full text-right  mt-6">
          Price:{" "}
          <span className="font-semibold text-xl text-right ">
            {formatPriceValue(String(price))}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          onClick={() => router.replace(`products/${id}`)}
          data-testid="see-more-button"
        >
          See more
        </Button>
      </CardFooter>
    </Card>
  );
}
