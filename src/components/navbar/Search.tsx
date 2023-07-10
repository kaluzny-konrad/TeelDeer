"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma } from "@prisma/client";
import { CommandGroup } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { Users } from "lucide-react";
import debounce from "lodash.debounce";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

type Props = {};

export default function SearchBar({}: Props) {
  const [input, setInput] = useState<string>("");

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (input.length < 3) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      //   return data as (Article & {
      //     _count: Prisma.ArticleCountOutputType;
      //   })[];
    },
    queryKey: ["search"],
    enabled: false,
  });

  const request = debounce(async () => refetch(), 500);

  const debounceRequest = useCallback(() => request(), []);

  const router = useRouter();
  const commandRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      data-testid="search-bar"
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder=""
        value={input}
        onValueChange={(value) => {
          setInput(value);
          debounceRequest();
        }}
      />

      {input.length > 0 && (
        <CommandList className="absolute top-full bg-white inset-x-0 shadow rounded-b-md">
          {isFetched && <CommandEmpty>No results</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 && (
            <CommandGroup>
              <p className="px-2 py-1 text-sm text-zinc-900">Communities</p>
              {/* {queryResults?.map((article) => (
                // <a href={`/r/${article.name}`} key={article.id}>
                //   <CommandItem
                //     onSelect={(e) => {
                //       router.push(`/r/${e}`);
                //       router.refresh();
                //     }}
                //     value={article.name}
                //     className="cursor-pointer"
                //   >
                //     <Users className="w-4 h-4 mr-2" />
                //     {article.name}
                //   </CommandItem>
                // </a>
              ))} */}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
}
