import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductDetailsActions from "./ProductDetailsActions";
import { useModalStore } from "@/stores/useModalStore";
import { useParams, useRouter } from "next/navigation";

jest.mock("@/stores/useModalStore");
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

const mockOpenEditProductDialog = jest.fn();
const mockOpenRemoveProductDialog = jest.fn();
const mockReplace = jest.fn();

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe("ProductDetailsActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseParams.mockReturnValue({ id: "1" } as any);

    mockUseRouter.mockReturnValue({
      replace: mockReplace,
    } as any);

    (useModalStore as unknown as jest.Mock).mockImplementation(
      (selector?: (state: any) => any) => {
        if (selector) {
          return selector({
            openEditProductDialog: mockOpenEditProductDialog,
            openRemoveProductDialog: mockOpenRemoveProductDialog,
          });
        }
        return {
          openEditProductDialog: mockOpenEditProductDialog,
          openRemoveProductDialog: mockOpenRemoveProductDialog,
        };
      }
    );
  });

  it("renders Edit Product and Delete buttons", () => {
    render(<ProductDetailsActions />);

    expect(
      screen.getByRole("button", { name: /edit product/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls openEditProductDialog with product id when Edit Product is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductDetailsActions />);

    const editButton = screen.getByRole("button", { name: /edit product/i });
    await user.click(editButton);

    expect(mockOpenEditProductDialog).toHaveBeenCalledTimes(1);
    expect(mockOpenEditProductDialog).toHaveBeenCalledWith(1);
  });

  it("calls openRemoveProductDialog with product id and callback when Delete is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductDetailsActions />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(mockOpenRemoveProductDialog).toHaveBeenCalledTimes(1);
    expect(mockOpenRemoveProductDialog).toHaveBeenCalledWith(
      1,
      expect.any(Function)
    );
  });

  it("calls router.replace('/') when remove dialog callback is executed", async () => {
    const user = userEvent.setup();
    render(<ProductDetailsActions />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    const callback = mockOpenRemoveProductDialog.mock.calls[0][1];
    callback();

    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("converts string id to number correctly", async () => {
    const user = userEvent.setup();
    mockUseParams.mockReturnValue({ id: "123" } as any);

    render(<ProductDetailsActions />);

    const editButton = screen.getByRole("button", { name: /edit product/i });
    await user.click(editButton);

    expect(mockOpenEditProductDialog).toHaveBeenCalledWith(123);
  });
});

