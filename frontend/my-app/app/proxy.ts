import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // if using http-only cookies
  // or check localStorage – but middleware runs on server, so we rely on cookies.

  const { pathname } = request.nextUrl;

  // Public paths
  if (pathname.startsWith("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protected paths
  if (!token && pathname !== "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};