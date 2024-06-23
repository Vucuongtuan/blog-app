"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useStoreZ from "@/lib/stores";
import api from "@/api/author.api";
import toast from "react-hot-toast";
import Image from "next/image";
import PaginationPage from "../pagination";
import { Button } from "../ui/button";
import DeleteButton from "./deleteButton";
import Link from "next/link";

export default function TableBlog() {
  const profile = useStoreZ((state) => state.profile);
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (profile) {
      fetchBlog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const fetchBlog = async (page?: number) => {
    if (profile && profile.id !== null) {
      const res = await api.getBlogByUser(profile.id, page);
      if (res.statusCode !== 200) {
        toast.error(res.message);
      } else {
        setData(res.data);
      }
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    fetchBlog(page);
  };

  return (
    <>
      <Table className="min-w-[800px]">
        <TableCaption>
          {data.length > 1
            ? "Danh sách bài viết của bạn"
            : "Bạn chưa có bài viết nào"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Tên bài viết</TableHead>
            <TableHead>Ngày đăng</TableHead>
            <TableHead className="text-center">Tính năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((invoice: any, index: number) => (
            <TableRow
              key={invoice.id}
              className="min-h-[100px] h-auto max-h-[200px]"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={invoice.thumbnail}
                  alt={invoice.description}
                  width={200}
                  height={200}
                />
              </TableCell>
              <TableCell>{invoice.title}</TableCell>
              <TableCell className="">{invoice.updateAt}</TableCell>
              <TableCell className="text-right space-x-4">
                <Button className="dark:bg-blue-400" aria-label="Sửa">
                  <Link href={`/author/dashboard/update?id=${invoice.id}`}>
                    Sửa
                  </Link>
                </Button>
                <DeleteButton id={invoice.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.totalPage >= 1 ? (
        <PaginationPage
          totalPages={data.totalPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : null}
    </>
  );
}
