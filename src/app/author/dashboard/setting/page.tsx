"use client";
import api from "@/api/author.api";
import useStoreZ from "@/lib/stores";
import { IProfileAuthor } from "@/types/blog.type";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SettingDashPage() {
  const { profile } = useStoreZ();
  const [data, setData] = useState<IProfileAuthor | any[]>([]);

  if (profile === null || profile === undefined) {
    return <>Ko thể tìm thấy thông tin vui lòng thử lại sau</>;
  }

  useEffect(() => {
    const getQuery = async () => {
      const res = await api.getAuthor(profile.id);
      if (res.statusCode !== 200) {
        toast.error(res.message);
        return;
      }

      return setData(res.data[0]);
    };
    getQuery();
  }, [profile.id]);
  return (
    <div className="p-2">
      <label htmlFor="Name">Tên tài khoản</label>
      <span>{data.name}</span>
    </div>
  );
}
