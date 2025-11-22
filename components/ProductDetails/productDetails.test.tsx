import { render, screen } from "@testing-library/react";
import ProductDetails from "./ProductDetails";
import { useProductDetails } from "./hooks/useProductDetails";
import { Product } from "@/types/products";
import { useParams, useRouter } from "next/navigation";
import { useModalStore } from "@/stores/useModalStore";
import { formatPriceValue } from "@/utils/formatCurrency";

jest.mock("./hooks/useProductDetails");
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock("@/stores/useModalStore");

const mockUseProductDetails = useProductDetails as jest.MockedFunction<
  typeof useProductDetails
>;
const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "This is a test product description",
  price: 99.99,
  category: "electronics",
  image: "https://example.com/image.jpg",
};

describe("ProductDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseParams.mockReturnValue({ id: "1" } as any);
    mockUseRouter.mockReturnValue({
      replace: jest.fn(),
    } as any);

    (useModalStore as unknown as jest.Mock).mockImplementation(
      (selector?: (state: any) => any) => {
        if (selector) {
          return selector({
            openEditProductDialog: jest.fn(),
            openRemoveProductDialog: jest.fn(),
          });
        }
        return {
          openEditProductDialog: jest.fn(),
          openRemoveProductDialog: jest.fn(),
        };
      }
    );
  });

  it("renders product details when product is loaded successfully", async () => {
    mockUseProductDetails.mockResolvedValue({
      product: mockProduct,
      error: false,
    });

    const component = await ProductDetails({ productId: 1 });
    render(component);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test product description")
    ).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "alt",
      "Test Product"
    );
  });

  it("renders error alert when error is true", async () => {
    mockUseProductDetails.mockResolvedValue({
      product: null,
      error: true,
    });

    const component = await ProductDetails({ productId: 1 });
    render(component);

    expect(
      screen.getByText(/we were unable to load the product/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/somehing went wrong/i)).toBeInTheDocument();
  });

  it("renders formatted price correctly", async () => {
    mockUseProductDetails.mockResolvedValue({
      product: mockProduct,
      error: false,
    });

    const component = await ProductDetails({ productId: 1 });
    render(component);

    const priceElement = screen.getByText(
      formatPriceValue(mockProduct.price.toString())
    );
    expect(priceElement).toBeInTheDocument();
  });

  it("renders ProductDetailsActions component", async () => {
    mockUseProductDetails.mockResolvedValue({
      product: mockProduct,
      error: false,
    });

    const component = await ProductDetails({ productId: 1 });
    render(component);

    expect(
      screen.getByRole("button", { name: /edit product/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("handles missing product data gracefully", async () => {
    mockUseProductDetails.mockResolvedValue({
      product: {
        id: 1,
        title: "",
        description: "",
        price: 0,
        category: "",
        image: "",
      },
      error: false,
    });

    const component = await ProductDetails({ productId: 1 });
    render(component);

    expect(screen.getByTestId("product-image")).toBeInTheDocument();
  });
});
