import { NextResponse, type NextRequest } from "next/server";

export function authGuard(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
