import { render, screen } from "@testing-library/react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import { formatPriceValue } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import { useModalStore } from "@/stores/useModalStore";

jest.mock("next/navigation");
jest.mock("@/stores/useModalStore");

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseModalStore = useModalStore as jest.MockedFunction<
  typeof useModalStore
>;
const mockOpenEditModal = jest.fn();
const mockOpenDeleteModal = jest.fn();

const props: ProductCardProps = {
  product: {
    id: 1,
    title: "RGB Gaming Mouse",
    description:
      "Ergonomic mouse with 7 programmable buttons and RGB lighting.",
    price: 149.9,
    category: "Peripherals",
    image: "https://example.com/mouse-gamer.png",
  },
};

describe("ProductCard", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
      push: jest.fn(),
    });

    mockUseModalStore.mockImplementation((selector?: (state: any) => any) => {
      if (selector) {
        return selector({
          openEditProductDialog: mockOpenEditModal,
          openRemoveProductDialog: mockOpenDeleteModal,
        });
      }
      return {
        openEditProductDialog: mockOpenEditModal,
        openRemoveProductDialog: mockOpenDeleteModal,
      };
    });
  });

  it("should render product data correctly", () => {
    render(<ProductCard {...props} />);

    expect(screen.getByText(props.product.title)).toBeInTheDocument();
    expect(screen.getByText(props.product.description)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(props.product.image))
    );
    expect(
      screen.getByText(formatPriceValue(props?.product?.price.toString()))
    ).toBeInTheDocument();
  });

  it("should redirect user to product details page when see more button is clicked", async () => {
    render(<ProductCard {...props} />);

    const router = mockUseRouter.mock.results[0]?.value;
    const user = userEvent.setup();
    const seeMoreButton = screen.getByTestId("see-more-button");

    await user.click(seeMoreButton);

    expect(router.replace).toHaveBeenCalledTimes(1);
    expect(router.replace).toHaveBeenCalledWith(`products/${props.product.id}`);
  });

  it("should open edit product dialog", async () => {
    render(<ProductCard {...props} />);

    const user = userEvent.setup();

    const openActionsDropdownButton = screen.getByTestId("open-card-actions");
    await user.click(openActionsDropdownButton);

    const openEditDialog = screen.getByTestId("open-edit-product-dialog");
    await user.click(openEditDialog);

    expect(mockOpenEditModal).toHaveBeenCalledTimes(1);
  });

  it("should open remove product dialog", async () => {
    render(<ProductCard {...props} />);

    const user = userEvent.setup();

    const openActionsDropdownButton = screen.getByTestId("open-card-actions");
    await user.click(openActionsDropdownButton);

    const openRemoveDialog = screen.getByTestId("open-remove-product-dialog");
    await user.click(openRemoveDialog);

    expect(mockOpenDeleteModal).toHaveBeenCalledTimes(1);
  });
});
