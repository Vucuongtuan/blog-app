// utils/cookies.js
import { cookies } from "next/headers";

export const getToken = (name: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get(name);
  return token ? true : false;
};
