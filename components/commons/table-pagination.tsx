"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

interface IProps {
  total: number;
  items?: number;
}

const TablePagination = ({ total, items }: IProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const size = items || 5;

  const page = Math.max(
      1,
      Number(searchParams.get("page") || 1)
);

  const paramsObj = Object.fromEntries(searchParams.entries());

  const totalPage = Math.ceil(total / size);

  const nearPageArray = useMemo(() => {
    const min = page - 2 > 0 ? page - 2 : 1;
    const max = page + 2 < totalPage ? page + 2 : totalPage;
    return Array.from({ length: max - min + 1 }).map(
      (_, index) => min + index
    );
  }, [page, totalPage]);

  // 🔥 helper create URL
 const createHref = (newPage: number) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(newPage));
  return `${pathname}?${params.toString()}`;
};

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createHref(page - 1)} />
          </PaginationItem>
        )}

        {nearPageArray.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href={createHref(p)}
              isActive={page === p}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page < totalPage && (
          <PaginationItem>
            <PaginationNext href={createHref(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;