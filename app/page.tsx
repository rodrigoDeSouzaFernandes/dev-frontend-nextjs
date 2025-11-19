import ProductsList from "@/components/ProductsList/ProductsList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-[1400px] m-auto p-4 pt-8">
      <ProductsList />
    </main>
  );
}
