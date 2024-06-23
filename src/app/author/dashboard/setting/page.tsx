"use client";
import api from "@/api/author.api";
import useStoreZ from "@/lib/stores";
import { IProfileAuthor } from "@/types/blog.type";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SettingDashPage() {
  const { profile } = useStoreZ();
  const [data, setData] = useState<IProfileAuthor>();

  useEffect(() => {
    if (!profile) return;

    const getQuery = async () => {
      try {
        const res = await api.getAuthor(profile.id);
        if (res.statusCode !== 200) {
          toast.error(res.message);
          return;
        }

        setData(res.data[0]);
      } catch (error) {
        console.error("Error fetching author data:", error);
        toast.error("Failed to fetch author data. Please try again later.");
      }
    };

    getQuery();
  }, [profile]);
  if (!profile) {
    return <>Ko thể tìm thấy thông tin vui lòng thử lại sau</>;
  }
  if (!data) {
    return <>Loading...</>;
  }
  return (
    <div className="p-2">
      <label htmlFor="Name">Tên tài khoản</label>
      <span>{data?.name}</span>
    </div>
  );
}
