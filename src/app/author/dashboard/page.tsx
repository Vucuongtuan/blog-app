import React from "react";
import image from "/content_creator.svg";
import Chart from "@/components/chart";
import { getNewBlog } from "@/api/blog.api";
import dynamic from "next/dynamic";
import ListBlog from "@/components/listBlog";
import StatsBlog from "@/components/viewHomeDash/statsBlog";

export default async function DashboardAuthor() {
  const get = await getNewBlog(1, 8);
  console.log("====================================");
  console.log(get);
  console.log("====================================");
  const getCurrentTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Chào buổi sáng";
    } else if (currentHour < 18) {
      return "Chào buổi chiều";
    } else {
      return "Chào buổi tối";
    }
  };
  return (
    <div className="p-4">
      <StatsBlog getCurrentTimeOfDay={getCurrentTimeOfDay()} />
      <section className="w-full h-auto min-h-[600px] px-4">
        <ListBlog data={get} />
      </section>
    </div>
  );
}
