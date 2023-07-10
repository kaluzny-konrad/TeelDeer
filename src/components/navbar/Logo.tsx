import Link from "next/link";
import React from "react";

type Props = {};

export default function Logo({}: Props) {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <p className="hidden text-zinc-700 text-sm font-bold md:block">TL;DR</p>
    </Link>
  );
}
