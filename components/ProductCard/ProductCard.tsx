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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

type ProductCardProps = {};

export default function ProductCard(props: ProductCardProps) {
  return (
    <Card className="sm:w-80">
      <div className="flex w-full gap-1 p-3">
        <CardHeader className="flex-1">
          <CardTitle>Computador</CardTitle>
          <CardDescription>
            pc gamer 24gb ram, amd ryzen 7, rx6600
          </CardDescription>
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
        <img
          src="data:image/jpeg;base64,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"
          alt="Product Image"
        />
        <p className="w-full text-right  mt-6">
          Price:{" "}
          <span className="font-semibold text-xl text-right ">R$ 5.789,99</span>
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
