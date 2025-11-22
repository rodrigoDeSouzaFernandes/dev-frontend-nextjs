import { render, screen } from "@testing-library/react";
import useProductsList from "./hooks/useProductsList";
import ProductsList from "./ProductsList";
import { Product } from "@/types/products";
import { formatPriceValue } from "@/utils/formatCurrency";

jest.mock("./hooks/useProductsList");
jest.mock("next/navigation");

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "This is a test product description",
  price: 99.99,
  category: "electronics",
  image: "https://example.com/image.jpg",
};

describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render alert in case of api call fail", async () => {
    (useProductsList as jest.Mock).mockResolvedValue({
      products: [],
      error: true,
    });

    render(await ProductsList());

    const alertTitle = screen.getByText(/Something Went Wrong/i);
    const alertDescription = screen.getByText(
      /We were unable to load the products/i
    );

    expect(alertTitle).toBeInTheDocument();
    expect(alertDescription).toBeInTheDocument();
  });

  it("shoud render product card in case of api call suceed", async () => {
    (useProductsList as jest.Mock).mockResolvedValue({
      products: [mockProduct],
      error: false,
    });

    render(await ProductsList());

    const productTitle = screen.getByText(mockProduct.title);
    const productDescription = screen.getByText(mockProduct.description);
    const productPrice = screen.getByText(
      formatPriceValue(mockProduct.price.toString())
    );

    expect(productTitle).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });
});
