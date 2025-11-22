import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useEditProductForm } from "./useEditProductForm";
import { Product, ProductFormType } from "@/types/products";
import { productsService } from "@/lib/services/products.service";
import { formatPriceValue } from "@/utils/formatCurrency";
import { toast } from "sonner";

jest.mock("@/lib/services/products.service", () => ({
  productsService: {
    update: jest.fn(),
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

const product: Product = {
  id: 1,
  title: "RGB Gaming Mouse",
  description: "Ergonomic mouse with 7 programmable buttons and RGB lighting.",
  price: 149.9,
  category: "Peripherals",
  image: "https://example.com/mouse-gamer.png",
};

describe("useEditProductForm hook", () => {
  const closeModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize form with current product values", () => {
    const { result } = renderHook(
      () =>
        useEditProductForm({
          closeModal,
          productId: product.id,
          productData: product,
        }),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.form.getValues()).toEqual({
      title: product.title,
      description: product.description,
      category: product.category,
      price: formatPriceValue(product.price.toString()),
      image: product.image,
    });

    expect(result.current.updateProductLoading).toBe(false);
    expect(result.current.updateProductError).toBe(false);
  });

  it("should call productsService.update and reset form on successful submission", async () => {
    (productsService.update as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(
      () =>
        useEditProductForm({
          closeModal,
          productId: product.id,
          productData: product,
        }),
      {
        wrapper: createWrapper(),
      }
    );

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

    expect(productsService.update).toHaveBeenCalledTimes(1);
    expect(productsService.update).toHaveBeenCalledWith(
      {
        id: product.id,
        payload: expect.objectContaining({
          title: "Product 01",
          price: expect.any(Number),
          description: "A product",
          category: "Category 01",
          image: expect.any(String),
        }),
      },
      // Ignores the internal param passed by useMutation from React Query
      expect.anything()
    );

    expect(toast.success).toHaveBeenCalledWith("Product updated successfully.");
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
    const { result } = renderHook(
      () =>
        useEditProductForm({
          closeModal,
          productId: product.id,
          productData: product,
        }),
      {
        wrapper: createWrapper(),
      }
    );

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

  it("should allow reset the form", () => {
    const { result } = renderHook(
      () =>
        useEditProductForm({
          closeModal,
          productId: product.id,
          productData: product,
        }),
      {
        wrapper: createWrapper(),
      }
    );

    act(() => {
      result.current.form.setValue("title", "Product X");
      result.current.resetForm();
    });

    expect(result.current.form.getValues()).toEqual({
      title: product.title,
      description: product.description,
      category: product.category,
      price: formatPriceValue(product.price.toString()),
      image: product.image,
    });
  });
});
