import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    const role = (session?.user as any)?.role;
    const reqUrl = new URL(req.url);

    // 1. Admin Portal Guard
    if (reqUrl.pathname.startsWith("/admin")) {
      // Permitted pages when not logged in
      if (
        reqUrl.pathname === "/admin/login" ||
        reqUrl.pathname === "/admin/register"
      ) {
        if (isLoggedIn && (role === "ADMIN" || role === "STAFF")) {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        return NextResponse.next();
      }

      // Force redirection to login
      if (!isLoggedIn) {
        return NextResponse.redirect(
          new URL(
            `/admin/login?callbackUrl=${encodeURIComponent(reqUrl.pathname)}`,
            req.url
          )
        );
      }

      // Role gate
      if (role !== "ADMIN" && role !== "STAFF") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // 2. Patient Portal Guard
    if (reqUrl.pathname.startsWith("/patient")) {
      if (!isLoggedIn) {
        return NextResponse.redirect(
          new URL(
            `/admin/login?callbackUrl=${encodeURIComponent(reqUrl.pathname)}`,
            req.url
          )
        );
      }
    }
  } catch (err) {
    console.error("Middleware auth check error:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/patient/:path*"],
};
