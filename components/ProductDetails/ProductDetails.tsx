import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { useProductDetails } from "./hooks/useProductDetails";
import ProductDetailsActions from "./ProductDetailsActions";

interface UseProductDetailsProps {
  productId: number;
}

export default async function ProductDetails({
  productId,
}: UseProductDetailsProps) {
  const { product, error } = await useProductDetails({ productId });

  return (
    <main className="max-w-[1400px] m-auto p-4 pt-8">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full h-[350px] bg-muted">
              <Image
                src={product?.image || ""}
                alt={product?.title || ""}
                fill
                className="object-contain p-4"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              {product?.title}
            </CardTitle>
            <Badge variant="secondary" className="w-fit mt-1">
              {product?.category}
            </Badge>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold mb-4">${product?.price}</p>

            <Separator className="my-4" />

            <p className="text-muted-foreground leading-relaxed">
              {product?.description}
            </p>

            <Separator className="my-6" />
            <ProductDetailsActions />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
