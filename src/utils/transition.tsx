"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Transition({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 15, opacity: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
          delay: index || 0 * 0.05,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
