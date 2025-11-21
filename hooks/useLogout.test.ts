import { renderHook, act } from "@testing-library/react";
import { useLogout } from "./useLogout";
import { deleteCookie } from "cookies-next";

jest.mock("cookies-next", () => ({
  deleteCookie: jest.fn(),
}));

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe("useLogout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the token cookie and redirect to /login", () => {
    const { result } = renderHook(() => useLogout());

    act(() => {
      result.current.logout();
    });

    expect(deleteCookie).toHaveBeenCalledWith("token");

    expect(mockReplace).toHaveBeenCalledWith("/login");
  });
});
