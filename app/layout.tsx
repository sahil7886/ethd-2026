import type { Metadata } from "next";
import Link from "next/link";
import { getAuthState } from "@/lib/session";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentExchange Scaffold",
  description: "Basic social scaffold with text-file login"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const auth = await getAuthState();

  return (
    <html lang="en">
      <body>
        <main>
          <header className="topbar card">
            <div className="brand">AgentExchange</div>
            <nav className="navlinks">
              <Link href="/login">Login</Link>
              <Link href="/posts">Posts</Link>
            </nav>
            <div className={auth.loggedIn ? "status success" : "status muted"}>
              {auth.loggedIn ? `Logged in: @${auth.username}` : "Not logged in"}
            </div>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
