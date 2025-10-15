"use client";
import api from "@/api/author.api";
import useStoreZ from "@/lib/stores";
import { IBlogStats } from "@/types/blog.type";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Title,
} from "chart.js";

ChartJS.register(BarElement, ArcElement, LinearScale, CategoryScale, Title);
interface IChartProps {
  profile: { name: string; id: string } | null;
  dataBlog: IBlogStats;
}
const Chart = ({ profile, dataBlog }: IChartProps) => {
  //check if dataBlog === undefined
  if (dataBlog === undefined) {
    return <>null</>;
  }

  const data = {
    labels: Object.keys(dataBlog.hashtag),
    datasets: [
      {
        label: "Số lượng bài viết",
        data: Object.values(dataBlog.hashtag),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        hoverOffset: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    width: 800,
    height: 400,
    legend: {
      display: false,
      position: "top",
    },
    plugins: {},
    scales: {
      y: {
        display: false,
      },
    },
  };

  return (
    <Bar
      data={data}
      options={options}
      className="mx-8 h-full dark:text-white"
    />
  );
};

export default React.memo(Chart);
