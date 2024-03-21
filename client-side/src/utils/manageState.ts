import { create } from "zustand";

interface AppUtilState {
  toggleMenu: boolean;
  toggleSearch: boolean;
  setToggleMenu: (value: boolean) => void;
  setToggleSearch: (value: boolean) => void;
}

export const useAppUtil = create<AppUtilState>((set) => ({
  toggleMenu: false,
  toggleSearch: false,
  setToggleMenu: (value: boolean) => set(() => ({ toggleMenu: value })),
  setToggleSearch: (value: boolean) => set(() => ({ toggleSearch: value })),
}));
