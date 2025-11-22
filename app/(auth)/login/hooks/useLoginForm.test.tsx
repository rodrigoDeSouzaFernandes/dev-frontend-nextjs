import { renderHook, act } from "@testing-library/react";
import { useLoginForm } from "./useLoginForm";
import { usersService } from "@/lib/services/users.service";
import { setCookie } from "cookies-next";
import { toast } from "sonner";
import { Login } from "@/types/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

jest.mock("@/lib/services/users.service", () => ({
  usersService: {
    login: jest.fn(),
  },
}));

jest.mock("cookies-next", () => ({
  setCookie: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: { error: jest.fn() },
}));

const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

const loginPayload: Login = {
  username: "test01",
  password: "test_01",
};

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useLoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper: wrapper });

    expect(result.current.showPassword).toBe(false);
    expect(result.current.form.getValues()).toEqual({
      username: "",
      password: "",
    });
  });

  it("should call usersService.login on submit", async () => {
    (usersService.login as jest.Mock).mockResolvedValue({
      token: "mock-token",
    });
    const { result } = renderHook(() => useLoginForm(), { wrapper: wrapper });

    await act(async () => {
      await result.current.onSubmit(loginPayload);
    });

    expect(usersService.login).toHaveBeenCalled();
  });

  it("should set cookie on success", async () => {
    (usersService.login as jest.Mock).mockResolvedValue({
      token: "mock-token",
    });
    const { result } = renderHook(() => useLoginForm(), { wrapper: wrapper });

    await act(async () => {
      await result.current.onSubmit(loginPayload);
    });

    expect(setCookie).toHaveBeenCalledWith("token", "mock-token");
  });

  it("should redirect on success", async () => {
    (usersService.login as jest.Mock).mockResolvedValue({
      token: "mock-token",
    });
    const { result } = renderHook(() => useLoginForm(), { wrapper: wrapper });

    await act(async () => {
      await result.current.onSubmit(loginPayload);
    });

    expect(mockReplace).toHaveBeenCalledWith("/products");
  });

  it("should call toast.error on login failure", async () => {
    (usersService.login as jest.Mock).mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });
    const { result } = renderHook(() => useLoginForm(), { wrapper: wrapper });

    await act(async () => {
      await result.current.onSubmit(loginPayload);
    });

    expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
  });
});
