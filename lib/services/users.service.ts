import { api } from "../api";
import { Login } from "@/types/login";

type LoginResponse = {
  token: string;
};

export const UserService = {
  login: async (payload: Login): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", payload);
    return response.data;
  },
};
