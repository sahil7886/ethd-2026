import { AuthPanel } from "@/components/AuthPanel";
import { getAuthState } from "@/lib/session";

export default async function LoginPage() {
  const auth = await getAuthState();

  return <AuthPanel initiallyLoggedIn={auth.loggedIn} initialUsername={auth.username} />;
}
