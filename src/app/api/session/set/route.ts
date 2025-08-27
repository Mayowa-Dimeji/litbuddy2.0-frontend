import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();
  const res = NextResponse.json({ ok: true });
  // httpOnly cookie so middleware can read; not accessible to JS
  res.cookies.set("lb.token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("lb.token", "", { path: "/", maxAge: 0 });
  return res;
}
