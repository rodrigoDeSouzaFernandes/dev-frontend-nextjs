import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header";

const mockRedirect = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: (...args: any[]) => mockRedirect(...args),
}));

const mockLogout = jest.fn();
jest.mock("@/hooks/useLogout", () => ({
  useLogout: () => ({ logout: mockLogout }),
}));

jest.mock("@/assets/user.webp", () => ({
  src: "/fake-user-image.webp",
}));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render title 'Next Store'", () => {
    render(<Header />);
    expect(screen.getByText("Next Store")).toBeInTheDocument();
  });

  it("should call redirect('/') by clicking on title", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const titleButton = screen.getByText("Next Store");
    await user.click(titleButton);

    expect(mockRedirect).toHaveBeenCalledWith("/");
  });

  it("should open dropdown by clicking on Avatar", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const avatar = screen.getByTestId("header-avatar");
    await user.click(avatar);

    expect(await screen.findByText("Logout")).toBeInTheDocument();
  });

  it("should call logout() by clicking in logout option", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const avatar = screen.getByTestId("header-avatar");
    await user.click(avatar);

    const logoutButton = await screen.findByText("Logout");

    await user.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
