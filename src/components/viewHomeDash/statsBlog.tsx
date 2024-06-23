"use client";
import React, { useEffect, useState } from "react";
import Chart from "../chart";
import useStoreZ from "@/lib/stores";
import { IBlogStats } from "@/types/blog.type";
import api from "@/api/author.api";
import toast from "react-hot-toast";
import LiveClock from "../LiveClock";
import { CardStack } from "../ui/card-stack";
import Transition from "@/utils/transition";
export default function StatsBlog({
  getCurrentTimeOfDay,
}: {
  getCurrentTimeOfDay: string;
}) {
  const { profile } = useStoreZ();
  const [dataBlog, setDataBlog] = useState<IBlogStats>();
  const date = new Date();
  useEffect(() => {
    if (profile !== null) {
      const get = async () => {
        const res = await api.getBlogStatsByUser(profile.id);
        if (res.statusCode !== 200) {
          toast.error(res.message);
        }
        setDataBlog(res.data);
      };
      get();
    }
  }, [profile]);
  return (
    <section className="w-full h-auto min-h-[400px]   space-x-6  p-2 flex min-[200px]:max-lg:flex-col min-[200px]:max-lg:min-h-[900px]">
      <Transition className="w-full  rounded-xl p-2  lg lg:w-2/3">
        <div className="px-2 lg:px-4 h-1/3">
          <div className=" flex justify-between items-center">
            <h2 className="text-4xl py-1 font-semibold ">Mừng trở lại !</h2>
            <span>
              <LiveClock />
            </span>
          </div>
          <p>
            <span className=" font-medium text-[#949f92]">
              {getCurrentTimeOfDay}
            </span>
          </p>
        </div>
        <div className="flex w-full  h-2/3  space-x-4 min-[200px]:max-lg:flex-col">
          <div className="border-2 lg:w-2/3 h-full rounded-xl p-4">
            <h3 className="text-lg pb-4">Author : {profile?.name}</h3>
            <div className="h-full flex item-center  items-center">
              <span className="text-3xl px-4">{dataBlog?.total || 0}</span>
              <span className=" mt-2 text-[#949f92]">
                {" "}
                bài viết trong tháng {date.getMonth() + 1}
              </span>
              <div className="px-12 min-[200px]:max-lg:px-2">
                <span className="text-3xl ">{dataBlog?.totalMonth || 0}</span>
                <span className=" mt-2 text-[#949f92]"> tổng bài viết</span>
              </div>
            </div>
          </div>
          <div className=" h-full min-[200px]:max-lg:mt-12">
            {dataBlog !== undefined ? (
              <CardStack items={dataBlog?.data} />
            ) : null}
          </div>
        </div>
      </Transition>
      <Transition
        index={0.1}
        className="w-1/3 border-2  rounded-xl min-[200px]:max-lg:w-full h-[400px p-2]"
      >
        {dataBlog !== undefined ? (
          <Chart profile={profile} dataBlog={dataBlog} />
        ) : null}
      </Transition>
    </section>
  );
}
