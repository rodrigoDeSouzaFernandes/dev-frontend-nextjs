import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authGuard } from "./lib/authGuard";

export function proxy(req: NextRequest) {
  const redirect = authGuard(req);
  if (redirect) return redirect;

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*"],
};
