"use client";
import { deleteBlog } from "@/api/blog.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export default function DeleteButton({ id }: { id: string }) {
  const handleDeleteItem = useCallback(async () => {
    const res = await deleteBlog(id);
    if (res.statusCode !== 200) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    return;
  }, [id]);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-400 rounded-lg">
        <Button className="">Xóa</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác thực xóa bài viết ?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn chắc là xóa bài viét này chứ
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Thoát</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteItem}>
            Đồng ý
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
