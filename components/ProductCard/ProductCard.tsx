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
      <CardContent className="mt-auto">
        <img className="min-h-40 max-h-60 h-[100%] sm:h-60 m-auto object-contain" src={image} alt={`Image of ${title}`} />
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
