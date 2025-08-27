import { NextRequest, NextResponse } from "next/server";

function readRoleFromCookie(req: NextRequest) {
  const t = req.cookies.get("lb.token")?.value;
  if (!t) return null;
  const p = t.split(".");
  if (p.length < 2) return null;
  try {
    const body = JSON.parse(
      Buffer.from(
        p[1].replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString()
    );
    return {
      role: body.role as "teacher" | "student" | undefined,
      onboarded: body.onboarded as boolean | undefined,
    };
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;

  // public paths (allow)
  const publicPaths = [
    "/",
    "/api",
    "/privacy",
    "/support",
    "/contact",
    "/auth",
  ];
  if (publicPaths.some((p) => path === p || path.startsWith(p + "/")))
    return NextResponse.next();

  const user = readRoleFromCookie(req);
  // no token → bounce to landing
  if (!user) {
    const to = new URL("/", req.url);
    return NextResponse.redirect(to);
  }

  // role-based guard
  if (path.startsWith("/teacher")) {
    if (user.role !== "teacher")
      return NextResponse.redirect(new URL("/home", req.url));
    return NextResponse.next();
  }

  if (path.startsWith("/home") || path.startsWith("/onboarding")) {
    if (user.role !== "student")
      return NextResponse.redirect(new URL("/teacher", req.url));
    // Optional: if the token has onboarded=false and they try /home → push them to /onboarding
    if (path.startsWith("/home") && user.onboarded === false) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
    return NextResponse.next();
  }

  // default allow
  return NextResponse.next();
}

// Only run on these routes
export const config = {
  matcher: ["/((?!_next|favicon.ico|images|hero-kids.png).*)"],
};
