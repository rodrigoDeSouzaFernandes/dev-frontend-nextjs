import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";
import ProductForm from "./ProductForm";
import { formatPriceValue } from "@/utils/formatCurrency";

const { result } = renderHook(() =>
  useForm({
    defaultValues: {
      title: "",
      price: "",
      category: "",
      description: "",
      image: "",
    },
  })
);

describe("ProductForm", () => {
  let form: ReturnType<typeof useForm>;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.clearAllMocks();
    user = userEvent.setup();
  });

  it("allows typing in the title input", async () => {
    render(<ProductForm form={result.current} />);

    const input = screen.getByTestId("title-input");

    await user.type(input, "My Product");

    expect(input).toHaveValue("My Product");
  });

  it("allows typing in the category input", async () => {
    render(<ProductForm form={result.current} />);

    const input = screen.getByTestId("category-input");

    await user.type(input, "Electronics");

    expect(input).toHaveValue("Electronics");
  });

  it("allows typing in the price input", async () => {
    render(<ProductForm form={result.current} />);

    const input = screen.getByTestId("price-input");

    await user.type(input, "123");

    expect(input).toHaveValue(formatPriceValue("123"));
  });

  it("allows typing in the description textarea", async () => {
    render(<ProductForm form={result.current} />);

    const textarea = screen.getByTestId("description-textarea");

    await user.type(textarea, "Nice product!");

    expect(textarea).toHaveValue("Nice product!");
  });

  it("allows uploading an image", async () => {
    render(<ProductForm form={result.current} />);

    const fileInput = screen.getByTestId("file-input") as HTMLInputElement;

    const file = new File(["dummy"], "image.png", { type: "image/png" });

    await fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    const inputFile = fileInput.files ? fileInput.files[0] : null;

    expect(inputFile).toBe(file);
    expect(inputFile?.name).toBe("image.png");
  });

  it("allows removing the uploaded image", async () => {
    render(<ProductForm form={result.current} />);

    const fileInput = screen.getByTestId("file-input") as HTMLInputElement;

    const file = new File(["dummy"], "image.png", { type: "image/png" });

    await user.upload(fileInput, file);

    const removeBtn = await screen.findByTestId("remove-image-button");

    await user.click(removeBtn);

    const newInput = screen.getByTestId("file-input");

    expect(newInput).toBeInTheDocument();
  });

  it("shows error message when submitting the form with empty fields", async () => {
    const form = result.current;
    render(<ProductForm form={form} />);

    act(() => {
      form.setError("title", {
        type: "manual",
        message: "Title is required",
      });
      form.setError("price", {
        type: "manual",
        message: "Price is required",
      });
      form.setError("description", {
        type: "manual",
        message: "Description is required",
      });
      form.setError("image", {
        type: "manual",
        message: "Image is required",
      });
    });

    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Price is required")).toBeInTheDocument();
    expect(screen.getByText("Description is required")).toBeInTheDocument();
    expect(screen.getByText("Image is required")).toBeInTheDocument();
  });
});
