import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token");
    const user = request.cookies.get("user");

    if (!token || !user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const userRole = JSON.parse(user.value).role.toLowerCase();
      if (!request.nextUrl.pathname.includes(`/dashboard/${userRole}`)) {
        return NextResponse.redirect(
          new URL(`/dashboard/${userRole}`, request.url)
        );
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
