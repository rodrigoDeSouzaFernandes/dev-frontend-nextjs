import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { useProductDetails } from "./hooks/useProductDetails";
import ProductDetailsActions from "./ProductDetailsActions";
import { formatPriceValue } from "@/utils/formatCurrency";
import { Alert } from "../ui/alert";
import CustomAlert from "../CustomAlert";

interface UseProductDetailsProps {
  productId: number;
}

export default async function ProductDetails({
  productId,
}: UseProductDetailsProps) {
  const { product, error } = await useProductDetails({ productId });

  return (
    <main className="max-w-[1400px] m-auto p-4 pt-8">
      {error ? (
        <CustomAlert
          variant="destructive"
          title="Somehing Went Wrong"
          description="We were unable to load the product at this time. This may be due to a temporary network issue on your side or a problem with our servers. Please check your connection and try again in a few minutes."
        />
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
          <Card className="overflow-hidden bg-muted">
            <CardContent className="p-0 relative w-full h-full min-h-[250px] sm:min-h-[350px] ">
              <Image
                src={product?.image || ""}
                alt={product?.title || ""}
                fill
                className="object-contain p-4"
              />
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
              <p className="text-4xl font-bold mb-4">
                {formatPriceValue(product?.price?.toString() || "")}
              </p>

              <Separator className="my-4" />

              <p className="text-muted-foreground leading-relaxed">
                {product?.description}
              </p>

              <Separator className="my-6" />
              <ProductDetailsActions />
            </CardContent>
          </Card>
        </section>
      )}
    </main>
  );
}
