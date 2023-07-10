import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/Button";

type Props = {
  title: string;
  description: string;
  href: string;
  linkTitle: string;
};

export default function LinkBox({
  title,
  description,
  href,
  linkTitle,
}: Props) {
  return (
    <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
      <div className="bg-slate-300 px-6 py-4">
        <p className="font-semibold py-3 flex items-center gap-1.5">{title}</p>
      </div>

      <div className="-my-3 px-6 py-4 text-sm leading-6 divide-gray-100 divide-y">
        <div className="flex justify-between gap-x-4 py-3">
          <p className="text-zinc-500">{description}</p>
        </div>

        <Link
          href={href}
          className={buttonVariants({
            className: "w-full mt-4 mb-6",
          })}
        >
          {linkTitle}
        </Link>
      </div>
    </div>
  );
}
