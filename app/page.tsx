import EditProductDialog from "@/components/EditProductDialog";
import LoadingFallback from "@/components/LoadingFallback/LoadingFallback";
import ProductsList from "@/components/ProductsList/ProductsList";
import RemoveProductDialog from "@/components/RemoveProductDialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-[1400px] m-auto p-4 pt-8">
      <section className="mb-6 flex">
        <h1 className="font-bold text-5xl">Produtos</h1>
        <Button className="ml-auto p-6 self-center">
          Cadastrar Novo Produto
        </Button>
      </section>
      <ProductsList />
    </main>
  );
}
