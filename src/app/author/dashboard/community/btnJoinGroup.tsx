"use client";
import { ApiAuthor } from "@/api/author.api";
import { Button } from "@/components/ui/button";
import useStoreZ from "@/lib/stores";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BtnJoinGroup() {
  const [loading, setLoading] = useState<boolean>(false);
  const [listGroup, setListGroup] = useState<any[]>([]);
  const api = new ApiAuthor();
  const { profile } = useStoreZ();
  useEffect(() => {
    const getGroup = async () => {
      const res = await api.getGroups();
      setListGroup(res.data);
    };
    getGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleJoinGroup = async (id: string, name: string) => {
    setLoading(true);
    try {
      if (profile !== null) {
        const create = await api.joinGroup(profile?.id, id, name);
        if (create.statusCode !== 200) {
          toast.error(create.message);
          return;
        }
        toast.success(create.message);
        return;
      }
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
