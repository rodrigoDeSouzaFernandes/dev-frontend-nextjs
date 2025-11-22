import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditProductDialog from "./EditProductDialog";
import { useEditProductForm } from "./hooks/useEditProductForm";
import { useEditProductDialog } from "./hooks/useEditProductDialog";
import { useModalStore } from "@/stores/useModalStore";
import { useForm } from "react-hook-form";

jest.mock("./hooks/useEditProductForm");
jest.mock("./hooks/useEditProductDialog");
jest.mock("@/stores/useModalStore");

const mockUseEditProductForm = useEditProductForm as jest.MockedFunction<
  typeof useEditProductForm
>;
const mockUseEditProductDialog = useEditProductDialog as jest.MockedFunction<
  typeof useEditProductDialog
>;
const mockCloseModal = jest.fn();
const mockClearForm = jest.fn();
const mockResetForm = jest.fn();

const { result } = renderHook(() =>
  useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  })
);

const useEditProductFormResponse = {
  form: result.current,
  handleFormSubmit: jest.fn(),
  clearForm: mockClearForm,
  resetForm: mockResetForm,
  updateProductLoading: false,
  updateProductError: false,
};

const useEditProductDialogResponse = {
  productData: {
    id: 1,
    title: "Test Product",
    price: 100,
    description: "Test Description",
    category: "electronics",
    image: "https://example.com/image.jpg",
  },
  isLoading: false,
  isError: false,
};

describe("EditProductDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseEditProductForm.mockReturnValue(useEditProductFormResponse as any);

    mockUseEditProductDialog.mockReturnValue(
      useEditProductDialogResponse as any
    );

    (useModalStore as unknown as jest.Mock).mockImplementation(
      (selector?: (state: any) => any) => {
        if (selector) {
          return selector({
            closeEditProductDialog: mockCloseModal,
          });
        }
        return {
          closeEditProductDialog: mockCloseModal,
        };
      }
    );
  });

  it("renders title, description and buttons", () => {
    render(<EditProductDialog productId={1} open={true} />);
    expect(screen.getByText("Edit product")).toBeInTheDocument();
    expect(
      screen.getByText(/edit the details of your product here/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reset form/i })
    ).toBeInTheDocument();
  });

  it("shows skeleton when isLoading is true", () => {
    mockUseEditProductDialog.mockReturnValue({
      ...useEditProductDialogResponse,
      isLoading: true,
    } as any);

    render(<EditProductDialog productId={1} open={true} />);

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("shows error alert when isError is true", () => {
    mockUseEditProductDialog.mockReturnValue({
      ...useEditProductDialogResponse,
      isError: true,
    } as any);

    render(<EditProductDialog productId={1} open={true} />);
    expect(
      screen.getByText(/we couldn't load the product data/i)
    ).toBeInTheDocument();
  });

  it("shows error alert when updateProductError is true", () => {
    mockUseEditProductForm.mockReturnValue({
      ...useEditProductFormResponse,
      updateProductError: true,
    } as any);

    render(<EditProductDialog productId={1} open={true} />);
    expect(
      screen.getByText(/we were unable to save your changes/i)
    ).toBeInTheDocument();
  });

  it("shows spinner when updateProductLoading is true", () => {
    mockUseEditProductForm.mockReturnValue({
      ...useEditProductFormResponse,
      updateProductLoading: true,
    } as any);

    render(<EditProductDialog productId={1} open={true} />);

    const saveButton = screen.getByRole("button", { name: /loading/i });
    expect(saveButton).toBeDisabled();
  });

  it("calls closeModal and clearForm on cancel click", async () => {
    const user = userEvent.setup();
    render(<EditProductDialog productId={1} open={true} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
    expect(mockClearForm).toHaveBeenCalledTimes(1);
  });

  it("calls resetForm on reset form button click", async () => {
    const user = userEvent.setup();
    render(<EditProductDialog productId={1} open={true} />);

    const resetButton = screen.getByRole("button", { name: /reset form/i });
    await user.click(resetButton);

    expect(mockResetForm).toHaveBeenCalledTimes(1);
  });
});
