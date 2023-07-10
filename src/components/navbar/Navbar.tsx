import Link from "next/link";

import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "@/components/navbar/UserAccountNav";
import Search from "@/components/navbar/Search";
import Logo from "@/components/navbar/Logo";
import { buttonVariants } from "@/components/ui/Button";

export default async function Navbar() {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* Auth */}

        <Logo />

        <Search />

        {session?.user ? (
          <UserAccountNav
            username={session.user.username}
            email={session.user.email}
            image={session.user.image}
          />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
