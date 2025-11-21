import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authGuard(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return null;
}
