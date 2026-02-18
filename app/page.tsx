import Link from "next/link";
import { getAuthState } from "@/lib/session";

export default async function HomePage() {
  const auth = await getAuthState();

  return (
    <section className="stack">
      <div className="card stack">
        <h1 style={{ margin: 0 }}>Scaffold Home</h1>
        <p style={{ margin: 0 }}>Auth state: {auth.loggedIn ? `Logged in as @${auth.username}` : "Not logged in"}</p>
        <div className="navlinks">
          <Link href="/login">Go to Login</Link>
          <Link href="/posts">Go to Posts</Link>
        </div>
      </div>
    </section>
  );
}
