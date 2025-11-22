import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateProductDialog from "./CreateProductDialog";
import { useCreateProductForm } from "./hooks/useCreateProductForm";
import { useModalStore } from "@/stores/useModalStore";
import { useForm } from "react-hook-form";

jest.mock("./hooks/useCreateProductForm");
jest.mock("@/stores/useModalStore");

const mockUseCreateProductForm = useCreateProductForm as jest.MockedFunction<
  typeof useCreateProductForm
>;
const mockCloseModal = jest.fn();
const mockClearForm = jest.fn();

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

const useCreateProductFormResponse = {
  form: result.current,
  handleFormSubmit: jest.fn(),
  clearForm: mockClearForm,
  createProductLoading: false,
  createProductError: false,
};

describe("CreateProductDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCreateProductForm.mockReturnValue(
      useCreateProductFormResponse as any
    );

    (useModalStore as unknown as jest.Mock).mockImplementation(
      (selector?: (state: any) => any) => {
        if (selector) {
          return selector({
            closeCreateProductDialog: mockCloseModal,
          });
        }
        return {
          closeCreateProductDialog: mockCloseModal,
        };
      }
    );
  });

  it("renders title, description and buttons", () => {
    render(<CreateProductDialog open={true} />);
    expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create product/i })
    ).toBeInTheDocument();
  });

  it("shows error alert when createProductError is true", () => {
    mockUseCreateProductForm.mockReturnValue({
      ...useCreateProductFormResponse,
      createProductError: true,
    } as any);

    render(<CreateProductDialog open={true} />);
    expect(
      screen.getByText(/there was a problem connecting to the server/i)
    ).toBeInTheDocument();
  });

  it("shows spinner when createProductLoading is true", () => {
    mockUseCreateProductForm.mockReturnValue({
      ...useCreateProductFormResponse,
      createProductLoading: true,
    } as any);

    render(<CreateProductDialog open={true} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("calls closeModal and clearForm on cancel click", async () => {
    const user = userEvent.setup();
    render(<CreateProductDialog open={true} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
    expect(mockClearForm).toHaveBeenCalledTimes(1);
  });
});
