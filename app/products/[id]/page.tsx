import { notFound } from "next/navigation";
import ProductBreadcrumb from "./ProductBreadcrumb/ProductBreadcrumb";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    notFound();
  }

  return (
    <main className="max-w-[1400px] m-auto p-4 pt-8">
      <ProductBreadcrumb productId={productId} />
      <ProductDetails productId={productId} />
    </main>
  );
}
