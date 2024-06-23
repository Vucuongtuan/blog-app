import create from "zustand";

interface AuthState {
  auth: boolean;
  profile: {
    name: string;
    id: string;
  } | null;
  login: (name: string, id: string) => void;
  logout: () => void;
}

const useStoreZ = create<AuthState>((set) => ({
  auth: false,
  profile:
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("profile") ?? "null")
      : {
          name: null,
          id: null,
        },
  login: (name, id) =>
    set((state) => ({
      auth: true,
      profile: {
        name,
        id,
      },
    })),
  logout: () =>
    set((state) => ({
      auth: false,
      profile: null,
    })),
}));

export default useStoreZ;
