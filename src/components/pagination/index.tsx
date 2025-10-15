"use client";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export default function PaginationPage({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  useEffect(() => {
    const maxVisiblePages = 4;
    let start = currentPage - Math.floor(maxVisiblePages / 2);
    if (start < 1) {
      start = 1;
    }
    let end = start + maxVisiblePages - 1;
    if (end > totalPages) {
      end = totalPages;
      start = end - maxVisiblePages + 1;
      if (start < 1) {
        start = 1;
      }
    }
    setVisiblePages(
      Array.from({ length: end - start + 1 }, (_, i) => start + i)
    );
  }, [totalPages, currentPage]);
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}{" "}
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
        ))}{" "}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
