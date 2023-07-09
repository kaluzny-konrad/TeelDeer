import Link from "next/link";

import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "@/components/navbar/UserAccountNav";

export default async function Navbar() {
  const session = await getAuthSession();

  return (
    <div>
      {/* Auth */}
      {session?.user ? (
        <UserAccountNav
          username={session.user.username}
          email={session.user.email}
          image={session.user.image}
        />
      ) : (
        <Link href="/sign-in">Sign In</Link>
      )}
    </div>
  );
}
