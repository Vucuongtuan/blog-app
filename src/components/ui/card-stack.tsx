"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IBlog } from "@/types/blog.type";

let interval: any;

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: IBlog[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<IBlog[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards: IBlog[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  if (items.length === 0) {
    return <>Empty</>;
  }
  return (
    <div className="relative  h-60  lg:w-72 md:h-60  w-full ">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-60 lg:w-72 md:h-60 md:w-full rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              <p className="text-neutral-500 pb-6 font-medium dark:text-white">
                {card.title}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    card.content.length > 100
                      ? `${card.content.slice(0, 100)}...`
                      : card.content,
                }}
              />
            </div>
            <div>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {/* {card.description} */}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
