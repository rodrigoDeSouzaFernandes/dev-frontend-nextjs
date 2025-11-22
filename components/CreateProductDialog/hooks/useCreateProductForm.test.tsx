import { renderHook, act } from "@testing-library/react";
import { useCreateProductForm, ProductFormType } from "./useCreateProductForm";
import { productsService } from "@/lib/services/products.service";
import { toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

jest.mock("@/lib/services/products.service", () => ({
  productsService: {
    create: jest.fn(),
  },
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn() },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCreateProductForm hook", () => {
  const closeModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize form with default values", () => {
    const { result } = renderHook(() => useCreateProductForm({ closeModal }), {
      wrapper: createWrapper(),
    });

    expect(result.current.form.getValues()).toEqual({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    expect(result.current.createProductLoading).toBe(false);
    expect(result.current.createProductError).toBe(false);
  });

  it("should call productsService.create and reset form on successful submission", async () => {
    (productsService.create as jest.Mock).mockResolvedValue({});
    const { result } = renderHook(() => useCreateProductForm({ closeModal }), {
      wrapper: createWrapper(),
    });

    const productData: ProductFormType = {
      title: "Product 01",
      price: "R$ 10,00",
      description: "A product",
      category: "Category 01",
      image: "image.png",
    };

    await act(async () => {
      await result.current.handleFormSubmit(productData);
    });

    expect(productsService.create).toHaveBeenCalledTimes(1);
    expect(productsService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Product 01",
        price: expect.any(Number),
        description: "A product",
        category: "Category 01",
        image: expect.any(String),
      }),
      // Ignores the internal param passed by useMutation from React Query
      expect.anything()
    );

    expect(toast.success).toHaveBeenCalledWith("Product created successfully.");
    expect(closeModal).toHaveBeenCalledTimes(1);

    expect(result.current.form.getValues()).toEqual({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
  });

  it("should allow clearing the form", () => {
    const { result } = renderHook(() => useCreateProductForm({ closeModal }), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.form.setValue("title", "Product X");
      result.current.clearForm();
    });

    expect(result.current.form.getValues()).toEqual({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
  });
});
