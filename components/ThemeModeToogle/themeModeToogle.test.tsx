import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeModeToggle from "./ThemeModeToogle";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ThemeModeToggle", () => {
  const setThemeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({
      setTheme: setThemeMock,
    });
  });

  it("renders the toggle button", () => {
    render(<ThemeModeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it("opens the dropdown menu on click", async () => {
    const user = userEvent.setup();
    render(<ThemeModeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(button);

    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it("calls setTheme with 'light' when clicking Light", async () => {
    const user = userEvent.setup();
    render(<ThemeModeToggle />);

    await user.click(screen.getByRole("button", { name: /toggle theme/i }));
    await user.click(screen.getByText("Light"));

    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it("calls setTheme with 'dark' when clicking Dark", async () => {
    const user = userEvent.setup();
    render(<ThemeModeToggle />);

    await user.click(screen.getByRole("button", { name: /toggle theme/i }));
    await user.click(screen.getByText("Dark"));

    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme with 'system' when clicking System", async () => {
    const user = userEvent.setup();
    render(<ThemeModeToggle />);

    await user.click(screen.getByRole("button", { name: /toggle theme/i }));
    await user.click(screen.getByText("System"));

    expect(setThemeMock).toHaveBeenCalledWith("system");
  });
});
