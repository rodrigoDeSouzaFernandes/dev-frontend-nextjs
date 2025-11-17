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
} from "@radix-ui/react-dropdown-menu";

import { Product } from "@/types/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product: { title, description, image, price },
}: ProductCardProps) {
  return (
    <Card className="sm:w-80">
      <div className="flex w-full gap-1 p-3">
        <CardHeader className="flex-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardAction></CardAction>
        </CardHeader>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-popover text-popover-foreground border border-border rounded-md shadow-md w-30 cursor-pointer"
          >
            <DropdownMenuItem className="p-2">Edit</DropdownMenuItem>
            <DropdownMenuItem className="p-2">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent>
        <img src={image} alt={`Image of ${title}`} />
        <p className="w-full text-right  mt-6">
          Price:{" "}
          <span className="font-semibold text-xl text-right ">R$ {price}</span>
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          See more
        </Button>
      </CardFooter>
    </Card>
  );
}
