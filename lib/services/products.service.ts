import { api } from "../api";
import { Product } from "@/types/products";

export const productsService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products");
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  create: async (payload: Product) => {
    const { data } = await api.post("/products", payload);
    return data;
  },

  update: async (id: number, payload: Product) => {
    const { data } = await api.put(`/products/${id}`, payload);
    return data;
  },

  remove: async (id: number) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
};
