"use client";
import React, {
  createContext,
  useRef,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import Header from "./header";
import Footer from "./footer";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

export interface StoreProviderProps {
  children: ReactNode;
}
export default function LayoutProvider({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: boolean;
}) {
  const pathName = usePathname();
  const [activeScrollTop, setActiveScrollTop] = useState<boolean>(false);

  useEffect(() => {
    if (pathName.includes("author")) {
      return;
    }
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setActiveScrollTop(true);
      } else {
        setActiveScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathName]);

  const handleScrollToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  if (pathName.includes("author")) {
    return <>{children}</>;
  }

  return (
    <>
      <Header auth={auth} />
      {children}
      <Footer />
      {activeScrollTop && (
        <motion.button
          aria-label="Scroll to top"
          className="h-10 w-10 border-2 flex justify-center items-center rounded-[100%] fixed bottom-4 right-4"
          onClick={handleScrollToTop}
          animate={{
            y: [100, 0],
            opacity: [0, 1],
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          }}
          initial={{ y: 100, opacity: 0 }}
          exit={{
            y: 100,
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: "easeIn",
            },
          }}
        >
          <ChevronUp className="" />
        </motion.button>
      )}
    </>
  );
}
