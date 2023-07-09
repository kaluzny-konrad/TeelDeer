"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import UserAvatar from "@/components/common/UserAvatar";

type Props = {
  username: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
};

export default function UserAccountNav({ username, email, image }: Props) {
  return (
    <DropdownMenu data-testid="user-account-nav">
      <DropdownMenuTrigger className="flex items-center gap-2">
        <UserAvatar
          user={{
            name: username || null,
            image: image || null,
          }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div>
          <div>
            {username && <p>{username}</p>}
            {email && <p>{email}</p>}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut({ callbackUrl: `${window.location.origin}/sign-in` });
          }}
          className="cursor-pointer"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
