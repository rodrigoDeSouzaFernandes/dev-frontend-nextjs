import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import { useLoginForm } from "./hooks/useLoginForm";
import { useForm } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { renderHook } from "@testing-library/react";

jest.mock("./hooks/useLoginForm");

const mockUseLoginForm = useLoginForm as jest.MockedFunction<
  typeof useLoginForm
>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("LoginForm", () => {
  const mockOnSubmit = jest.fn();
  const mockSetShowPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const { result } = renderHook(() =>
      useForm({
        defaultValues: {
          username: "",
          password: "",
        },
      })
    );

    mockUseLoginForm.mockReturnValue({
      form: result.current,
      onSubmit: mockOnSubmit,
      showPassword: false,
      setShowPassword: mockSetShowPassword,
      isPending: false,
    } as any);
  });

  it("should render the form with username and password inputs", () => {
    render(<LoginForm />, { wrapper: createWrapper() });

    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("should render login button", () => {
    render(<LoginForm />, { wrapper: createWrapper() });

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should allow typing in username input", async () => {
    const user = userEvent.setup();
    render(<LoginForm />, { wrapper: createWrapper() });

    const usernameInput = screen.getByTestId("username-input");
    await user.type(usernameInput, "testuser");

    expect(usernameInput).toHaveValue("testuser");
  });

  it("should allow typing in password input", async () => {
    const user = userEvent.setup();
    render(<LoginForm />, { wrapper: createWrapper() });

    const passwordInput = screen.getByTestId("password-input");
    await user.type(passwordInput, "testpass");

    expect(passwordInput).toHaveValue("testpass");
  });

  it("should toggle password visibility when eye button is clicked", async () => {
    const user = userEvent.setup();
    const { result: formResult } = renderHook(() =>
      useForm({
        defaultValues: {
          username: "",
          password: "",
        },
      })
    );

    mockUseLoginForm.mockReturnValue({
      form: formResult.current,
      onSubmit: mockOnSubmit,
      showPassword: false,
      setShowPassword: mockSetShowPassword,
      isPending: false,
    } as any);

    const { rerender } = render(<LoginForm />, { wrapper: createWrapper() });

    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button", {
      name: /show password/i,
    });
    await user.click(toggleButton);

    expect(mockSetShowPassword).toHaveBeenCalledTimes(1);

    mockUseLoginForm.mockReturnValue({
      form: formResult.current,
      onSubmit: mockOnSubmit,
      showPassword: true,
      setShowPassword: mockSetShowPassword,
      isPending: false,
    } as any);
    rerender(<LoginForm />);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: /hide password/i })
    ).toBeInTheDocument();
  });

  it("should show spinner when isPending is true", () => {
    const { result: formResult } = renderHook(() =>
      useForm({
        defaultValues: {
          username: "",
          password: "",
        },
      })
    );

    mockUseLoginForm.mockReturnValue({
      form: formResult.current,
      onSubmit: mockOnSubmit,
      showPassword: false,
      setShowPassword: mockSetShowPassword,
      isPending: true,
    } as any);

    render(<LoginForm />, { wrapper: createWrapper() });

    const submitButton = screen.getByRole("button", { name: /loading/i });
    expect(submitButton).toBeDisabled();
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
  });

  it("should enable submit button when isPending is false", () => {
    render(<LoginForm />, { wrapper: createWrapper() });

    const submitButton = screen.getByRole("button", { name: /login/i });
    expect(submitButton).not.toBeDisabled();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it("should call onSubmit when form is submitted", async () => {
    const user = userEvent.setup();
    render(<LoginForm />, { wrapper: createWrapper() });

    const form = screen.getByRole("button", { name: /login/i }).closest("form");
    if (form) {
      await user.click(screen.getByRole("button", { name: /login/i }));
    }

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it("should have correct input attributes", () => {
    render(<LoginForm />, { wrapper: createWrapper() });

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");

    expect(usernameInput).toHaveAttribute("placeholder", "username");
    expect(usernameInput).toHaveAttribute("maxLength", "20");
    expect(usernameInput).toHaveAttribute("autoComplete", "off");

    expect(passwordInput).toHaveAttribute("placeholder", "********");
    expect(passwordInput).toHaveAttribute("maxLength", "20");
    expect(passwordInput).toHaveAttribute("autoComplete", "off");
  });
});
