import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/session";
import { verifyLogin } from "@/lib/userStore";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };

  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "");

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  const valid = await verifyLogin(username, password);

  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, username, loggedIn: true }, { status: 200 });
  response.cookies.set(AUTH_COOKIE_NAME, username, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
