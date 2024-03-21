import { create } from "zustand";

interface AppUtilState {
  toggleMenu: boolean;
  setToggleMenu: (value: boolean) => void;
}

export const useAppUtil = create<AppUtilState>((set) => ({
  toggleMenu: false,
  setToggleMenu: (value: boolean) => set(() => ({ toggleMenu: value })),
}));
