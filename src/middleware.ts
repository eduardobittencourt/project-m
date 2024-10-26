import { updateSession } from "@/auth/session";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./auth";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/", "/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const authentication = await isAuthenticated();

  if (isProtectedRoute && !authentication) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (authentication) {
    await updateSession();

    if (isPublicRoute && !req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
