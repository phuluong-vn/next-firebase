"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import useChangeQuery from "@/utils/hook/useChangeQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const SearchBar = () => {
  const { onChangeQuery, getQuery } = useChangeQuery();
  const [keyword, setKeyword] = useState(getQuery("keyword"));

  const onSubmitSearch = () => {
    onChangeQuery("keyword", keyword);
  };
const searchParams = useSearchParams();
const pathname = usePathname();
 const { push } = useRouter();
const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("keyword");
    params.set("page", "1");

    setKeyword("");

    push(`${pathname}?${params.toString()}`);
  };


  return (
    <div className="relative flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        type="text"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmitSearch();
          }
        }}
      />
      {keyword && (
        <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2"
        >
            ✕
        </button>
        )}
    </div>
  );
};

export default SearchBar;