import { render, screen } from "@testing-library/react";
import ProductsListHeader from "./ProductsListHeader";
import { useModalStore } from "@/stores/useModalStore";
import userEvent from "@testing-library/user-event";

jest.mock("@/stores/useModalStore");
const mockOpenModal = jest.fn();

describe("ProductListHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useModalStore as unknown as jest.Mock).mockImplementation(
      (selector?: (state: any) => any) => {
        if (selector) {
          return selector({
            openCreateProductDialog: mockOpenModal,
          });
        }
        return {
          openCreateProductDialog: mockOpenModal,
        };
      }
    );
  });

  it("should render title and button", () => {
    render(<ProductsListHeader />);

    const title = screen.getByRole("heading", { name: /products/i });
    const button = screen.getByRole("button", { name: /create/i });

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should open create product dialog", async () => {
    render(<ProductsListHeader />);

    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: /create/i });

    await user.click(button);

    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });
});
