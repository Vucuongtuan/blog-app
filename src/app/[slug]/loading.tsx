import Container from "@/components/container";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-500">
      <section className="bg-gray-300 dark:bg-gray-800 py-8 h-[400px] w-full">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse flex items-center space-x-4"></div>
        </div>
      </section>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Container>
          <div className="px-8 animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-full"></div>
            <div className="text-[#6b6b6b] text-center flex justify-center items-center space-x-2">
              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-800 rounded-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded"></div>
            </div>
            <div className="animate-pulse space-y-4 mt-12">
              <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded"></div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
