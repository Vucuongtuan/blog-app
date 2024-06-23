"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SocketClient } from "@/app/socket";
export const ContextSocket: any = createContext(null);
function ProviderUI({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string | null;
}) {
  const [count, setCount] = useState<number>(10);
  const [check, setCheck] = useState<boolean>(false);
  const auth = useMemo(() => token !== null, [token]);
  const router = useRouter();

  const onConnect = useCallback(() => {
    setCheck(true);
  }, []);

  const onDisconnect = useCallback(() => {
    setCheck(false);
  }, []);
  useEffect(() => {
    // alert(JSON.stringify(token));
    if (token !== null) {
      SocketClient(token).on("connect", onConnect);
    }
    SocketClient(token).on("disconnect", onDisconnect);

    return () => {
      SocketClient().off("connect", onConnect);
      SocketClient().off("disconnect", onDisconnect);
    };
  }, [onConnect, onDisconnect, token]);
  useEffect(() => {
    if (auth === false) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      const time = setTimeout(() => {
        router.push("/login");
      }, 10000);
      return () => {
        clearInterval(interval);
        window.clearTimeout(time);
      };
    }
  }, [auth, router]);
  if (auth === false) {
    return (
      <>
        <h2>Ohh !! Bạn chưa đăng nhập</h2>
        <p>
          <span>
            Còn <div className="w-[15px] ">{count}</div>
            để đến trang đăng nhập hoặc{" "}
            <Link
              href="/login"
              className=" font-semibold text-blue-500 dark:text-red-500"
            >
              tại đây
            </Link>
          </span>
        </p>
      </>
    );
  }
  return (
    <ContextSocket.Provider value={check}>{children}</ContextSocket.Provider>
  );
}
export default React.memo(ProviderUI);
