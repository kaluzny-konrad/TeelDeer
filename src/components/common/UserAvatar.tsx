import { User } from "next-auth";
import React from "react";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Icons } from "@/components/common/Icons";

interface Props extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

export default function UserAvatar({ user, ...props }: Props) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div>
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
