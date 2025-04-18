import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const user = localStorage.getItem("user");
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRole = JSON.parse(user).role.toLowerCase();
    if (!request.nextUrl.pathname.includes(`/dashboard/${userRole}`)) {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
