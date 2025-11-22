import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import useRemoveProductDialog from "./useRemoveProductDialog";
import { productsService } from "@/lib/services/products.service";
import { toast } from "sonner";

jest.mock("@/lib/services/products.service", () => ({
  productsService: { delete: jest.fn() },
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn() },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useRemoveProductDialog hook", () => {
  const closeModal = jest.fn();
  const onSucces = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should have initial state", () => {
    const { result } = renderHook(
      () => useRemoveProductDialog({ closeModal, onSucces }),
      { wrapper: createWrapper() }
    );

    expect(result.current.isPending).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should call productsService.delete and handle success", async () => {
    (productsService.delete as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(
      () => useRemoveProductDialog({ closeModal, onSucces }),
      { wrapper: createWrapper() }
    );

    await act(async () => {
      result.current.deleteProduct(1);
    });

    expect(productsService.delete).toHaveBeenCalledWith(1, expect.anything());
    expect(toast.success).toHaveBeenCalledWith("Product deleted successfully.");
    expect(closeModal).toHaveBeenCalledTimes(1);
    expect(onSucces).toHaveBeenCalledTimes(1);
  });

  it("should set isError to true on failure", async () => {
    (productsService.delete as jest.Mock).mockRejectedValue(
      new Error("Failed")
    );

    const { result } = renderHook(
      () => useRemoveProductDialog({ closeModal, onSucces }),
      { wrapper: createWrapper() }
    );

    await act(async () => {
      result.current.deleteProduct(1);
    });

    expect(productsService.delete).toHaveBeenCalledWith(1, expect.anything());
    expect(result.current.isError).toBe(true);
    expect(closeModal).not.toHaveBeenCalled();
    expect(onSucces).not.toHaveBeenCalled();
  });
});
