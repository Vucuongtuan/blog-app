"use server";

import { cookies } from "next/headers";
interface IProfile {
  name: string;
  id: string;
}
export async function create(
  token: string,
  profile: IProfile,
  maxAge?: number
): Promise<void> {
  cookies().set({
    name: "access_token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: maxAge,
  });
}
export async function get(name: string): Promise<boolean> {
  const getToken = await cookies().get("access_token");
  if (getToken !== undefined) {
    return true;
  }
  return false;
}
export async function deleteCookie(name: string) {
  cookies().delete(name);
}
