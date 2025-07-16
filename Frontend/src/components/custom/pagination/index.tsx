"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { createQueryString } from "@/modules/helpers/search-params";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export function CustomPagination({
  currentPage,
  totalPages,
  prefix,
}: {
  totalPages?: number;
  currentPage: number;
  prefix?: string;
}) {
  const queryName = prefix ? `${prefix}_page` : "page";
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = (page: number) => {
    setSearchParams(
      createQueryString({
        name: queryName,
        value: page.toString(),
        searchParams,
      })
    );
  };

  useEffect(() => {
    if (totalPages && currentPage > totalPages) {
      setSearchParams(
        createQueryString({
          name: queryName,
          value: totalPages.toString(),
          searchParams,
        })
      );
    }
  }, [currentPage, totalPages, queryName]);
  if (totalPages === undefined) {
    return <CustomPaginationSkeleton />;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage - 1 < 1}
            onClick={() => onClick(currentPage - 1)}
          />
        </PaginationItem>

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => onClick(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink onClick={() => onClick(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => onClick(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            disabled={totalPages <= currentPage}
            onClick={() => onClick(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function CustomPaginationSkeleton() {
  return (
    <Pagination>
      <PaginationContent>
        <Skeleton className="h-10 w-10 mx-1" />
        <Skeleton className="h-10 w-10 mx-1" />
        <Skeleton className="h-10 w-10 mx-1" />
        <Skeleton className="h-10 w-10 mx-1" />
      </PaginationContent>
    </Pagination>
  );
}
