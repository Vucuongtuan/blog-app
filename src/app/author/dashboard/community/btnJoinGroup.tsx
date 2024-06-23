"use client";
import { ApiAuthor } from "@/api/author.api";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BtnJoinGroup() {
  const [loading, setLoading] = useState<boolean>(false);
  const [listGroup, setListGroup] = useState<any[]>([]);
  const api = new ApiAuthor();
  const local = JSON.parse(localStorage.getItem("profile") ?? "null");
  useEffect(() => {
    const getGroup = async () => {
      const res = await api.getGroups();
      setListGroup(res.data);
    };
    getGroup();
  }, []);
  const handleJoinGroup = async (id: string, name: string) => {
    setLoading(true);
    try {
      const create = await api.joinGroup(local?.id, id, name);
      if (create.statusCode !== 200) {
        toast.error(create.message);
        return;
      }
      toast.success(create.message);
      return;
    } catch (err) {
      toast.error("Vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <span className="text-2xl">Loading ...</span>;
  }
  return (
    <>
      {listGroup.map((item: any) => (
        <Button
          className="w-[200px]"
          onClick={() => handleJoinGroup(item.id, item.name)}
          key={item.id}
        >
          Tham gia
        </Button>
      ))}
    </>
  );
}
