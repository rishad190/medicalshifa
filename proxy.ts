import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/admin/login");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin") && !isAuthPage;

  if (isAdminPage && !isLoggedIn) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL("/admin/upload", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
