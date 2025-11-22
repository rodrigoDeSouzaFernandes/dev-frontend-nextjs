import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "./authGuard";

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn((url: URL) => ({
      status: 302,
      headers: { location: url.toString() },
    })),
  },
}));

describe("authGuard", () => {
  const mockUrl = "https://mockurl.com/products";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null when token cookie exists", () => {
    const req = {
      url: mockUrl,
      cookies: {
        get: jest.fn((name: string) => {
          if (name === "token") {
            return { value: "valid-token" };
          }
          return undefined;
        }),
      },
    } as unknown as NextRequest;

    const result = authGuard(req);

    expect(result).toBeNull();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  it("should redirect to /login when token cookie does not exist", () => {
    const req = {
      url: mockUrl,
      cookies: {
        get: jest.fn((name: string) => {
          if (name === "token") {
            return undefined;
          }
          return undefined;
        }),
      },
    } as unknown as NextRequest;

    const result = authGuard(req);

    expect(result).not.toBeNull();
    expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/login", mockUrl)
    );
  });

  it("should redirect to /login when token cookie value is undefined", () => {
    const req = {
      url: mockUrl,
      cookies: {
        get: jest.fn((name: string) => {
          if (name === "token") {
            return { value: undefined };
          }
          return undefined;
        }),
      },
    } as unknown as NextRequest;

    const result = authGuard(req);

    expect(result).not.toBeNull();
    expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/login", mockUrl)
    );
  });

  it("should redirect to /login when token cookie value is empty string", () => {
    const req = {
      url: mockUrl,
      cookies: {
        get: jest.fn((name: string) => {
          if (name === "token") {
            return { value: "" };
          }
          return undefined;
        }),
      },
    } as unknown as NextRequest;

    const result = authGuard(req);

    expect(result).not.toBeNull();
    expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/login", mockUrl)
    );
  });

  it("should use the request URL as base for redirect URL", () => {
    const customUrl = "https://mockurl.com/custom/path";
    const req = {
      url: customUrl,
      cookies: {
        get: jest.fn(() => undefined),
      },
    } as unknown as NextRequest;

    authGuard(req);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/login", customUrl)
    );
  });

  it("should handle different token values correctly", () => {
    const tokenValues = ["token123", "Bearer abc.def.ghi", "jwt-token"];

    tokenValues.forEach((tokenValue) => {
      jest.clearAllMocks();
      const req = {
        url: mockUrl,
        cookies: {
          get: jest.fn((name: string) => {
            if (name === "token") {
              return { value: tokenValue };
            }
            return undefined;
          }),
        },
      } as unknown as NextRequest;

      const result = authGuard(req);

      expect(result).toBeNull();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });
  });
});
