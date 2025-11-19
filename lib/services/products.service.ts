import { api } from "../api";
import { Product } from "@/types/products";

interface ProductUpdateRequest {
  id: number;
  payload: Product;
}

export const productsService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products");
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  create: async (payload: Product): Promise<Product> => {
    const { data } = await api.post("/products", payload);
    return data;
  },

  update: async ({ id, payload }: ProductUpdateRequest): Promise<Product> => {
    const { data } = await api.put(`/products/${id}`, payload);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
