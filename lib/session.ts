import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const AUTH_COOKIE_NAME = "auth_user";

type AuthState = {
  loggedIn: boolean;
  username: string | null;
};

export async function getAuthState(): Promise<AuthState> {
  const store = await cookies();
  const username = store.get(AUTH_COOKIE_NAME)?.value ?? null;

  return {
    loggedIn: Boolean(username),
    username
  };
}

export async function requireLoggedIn(): Promise<{ username: string }> {
  const auth = await getAuthState();
  if (!auth.loggedIn || !auth.username) {
    redirect("/login");
  }

  return { username: auth.username };
}
