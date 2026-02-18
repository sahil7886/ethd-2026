"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ApiResponse = {
  ok?: boolean;
  username?: string;
  loggedIn?: boolean;
  error?: string;
};

export function AuthPanel({ initiallyLoggedIn, initialUsername }: { initiallyLoggedIn: boolean; initialUsername: string | null }) {
  const router = useRouter();
  const [signupMessage, setSignupMessage] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(initiallyLoggedIn);
  const [username, setUsername] = useState<string | null>(initialUsername);

  async function onSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSignupLoading(true);
    setSignupMessage("");

    const formData = new FormData(form);
    const usernameInput = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (password.length < 8) {
      setSignupLoading(false);
      setSignupMessage("Password must be at least 8 characters.");
      return;
    }

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameInput, password })
    });

    const data = (await response.json()) as ApiResponse;
    setSignupLoading(false);

    if (!response.ok) {
      setSignupMessage(data.error ?? "Signup failed.");
      return;
    }

    setSignupMessage("User created. You can now log in.");
    form.reset();
  }

  async function onLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginLoading(true);
    setLoginMessage("");

    const formData = new FormData(event.currentTarget);
    const usernameInput = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameInput, password })
    });

    const data = (await response.json()) as ApiResponse;
    setLoginLoading(false);

    if (!response.ok) {
      setLoginMessage(data.error ?? "Login failed.");
      return;
    }

    setLoggedIn(Boolean(data.loggedIn));
    setUsername(data.username ?? null);
    setLoginMessage(`Login successful. Welcome, ${data.username}.`);
    router.refresh();
  }

  async function onLogout() {
    setLogoutLoading(true);
    setLoginMessage("");

    await fetch("/api/auth/logout", { method: "POST" });
    setLoggedIn(false);
    setUsername(null);
    setLogoutLoading(false);
    router.refresh();
  }

  return (
    <section className="stack">
      <h1 style={{ margin: 0 }}>Login Scaffold</h1>
      <p style={{ marginTop: 0 }}>
        Credentials are stored in <code>data/users.txt</code> as plain text for hackathon scaffolding.
      </p>

      <div className="card stack">
        <strong>{loggedIn ? `Logged in as @${username}` : "Not logged in"}</strong>
        <div>
          <button type="button" className="secondary" onClick={onLogout} disabled={!loggedIn || logoutLoading}>
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      <div className="grid">
        <form className="card stack" onSubmit={onSignup}>
          <h2 style={{ margin: 0 }}>Sign up</h2>
          <label>
            Username
            <input name="username" minLength={3} required />
          </label>
          <label>
            Password (8+)
            <input name="password" type="password" minLength={8} required />
          </label>
          <button type="submit" disabled={signupLoading}>
            {signupLoading ? "Creating..." : "Create user"}
          </button>
          {signupMessage && (
            <p className={signupMessage.includes("created") ? "success" : "error"}>{signupMessage}</p>
          )}
        </form>

        <form className="card stack" onSubmit={onLogin}>
          <h2 style={{ margin: 0 }}>Log in</h2>
          <label>
            Username
            <input name="username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" required />
          </label>
          <button type="submit" disabled={loginLoading}>
            {loginLoading ? "Checking..." : "Log in"}
          </button>
          {loginMessage && (
            <p className={loginMessage.includes("successful") ? "success" : "error"}>{loginMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}
