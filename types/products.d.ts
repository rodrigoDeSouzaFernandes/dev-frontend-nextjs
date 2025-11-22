import { z } from "zod";
import { producFormSchema } from "@/schemas/product/product.schema";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type ProductFormType = z.infer<typeof producFormSchema>;
