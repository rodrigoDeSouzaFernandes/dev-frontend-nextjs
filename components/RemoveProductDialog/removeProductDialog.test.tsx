import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RemoveProductDialog from "./RemoveProductDialog";
import useRemoveProductDialog from "./hooks/useRemoveProductDialog";
import { useModalStore } from "@/stores/useModalStore";

jest.mock("./hooks/useRemoveProductDialog");
jest.mock("@/stores/useModalStore");

describe("RemoveProductDialog", () => {
  const closeModal = jest.fn();
  const onSucces = jest.fn();
  const productId = 1;

  beforeEach(() => {
    jest.clearAllMocks();

    (useModalStore as unknown as jest.Mock).mockReturnValue(closeModal);
  });

  it("renders dialog with title and description", () => {
    (useRemoveProductDialog as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      deleteProduct: jest.fn(),
    });

    render(
      <RemoveProductDialog
        open={true}
        productId={productId}
        onSucces={onSucces}
      />
    );

    expect(screen.getByText(/Are you absolutely sure\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /This action cannot be undone\. This will permanently delete the product data/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Delete product/i)).toBeInTheDocument();
  });

  it("shows spinner when isPending is true", () => {
    (useRemoveProductDialog as jest.Mock).mockReturnValue({
      isPending: true,
      isError: false,
      deleteProduct: jest.fn(),
    });

    render(
      <RemoveProductDialog
        open={true}
        productId={productId}
        onSucces={onSucces}
      />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /loading/i })
    ).toBeDisabled();
  });

  it("shows error alert when isError is true", () => {
    (useRemoveProductDialog as jest.Mock).mockReturnValue({
      isPending: false,
      isError: true,
      deleteProduct: jest.fn(),
    });

    render(
      <RemoveProductDialog
        open={true}
        productId={productId}
        onSucces={onSucces}
      />
    );

    expect(
      screen.getByText(
        /There was an error while trying to remove the product\. Please try again\./i
      )
    ).toBeInTheDocument();
  });

  it("calls deleteProduct when clicking delete button", async () => {
    const deleteProduct = jest.fn();
    (useRemoveProductDialog as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      deleteProduct,
    });

    const user = userEvent.setup();

    render(
      <RemoveProductDialog
        open={true}
        productId={productId}
        onSucces={onSucces}
      />
    );

    const btn = screen.getByRole("button", { name: /Delete product/i });
    await user.click(btn);

    expect(deleteProduct).toHaveBeenCalledWith(productId);
  });

  it("calls closeModal when clicking cancel", async () => {
    const user = userEvent.setup();

    (useRemoveProductDialog as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      deleteProduct: jest.fn(),
    });

    render(
      <RemoveProductDialog
        open={true}
        productId={productId}
        onSucces={onSucces}
      />
    );

    const cancelBtn = screen.getByText(/Cancel/i);
    await user.click(cancelBtn);

    expect(closeModal).toHaveBeenCalled();
  });
});
