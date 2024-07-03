import { create } from "zustand";
import { AppModalState, AppUtilState, NavScrollTriggerState } from "../types";

export const useNavScrollTrigger = create<NavScrollTriggerState>((set) => ({
  navScrollTrigger: false,
  setNavScrollTrigger: (value: boolean) =>
    set(() => ({ navScrollTrigger: value })),
}));

export const useAppUtil = create<AppUtilState>((set) => ({
  openSwitch: false,
  toggleMenu: false,
  toggleSearch: false,
  setOpenSwitch: (value: boolean) => set(() => ({ openSwitch: value })),
  setToggleMenu: (value: boolean) => set(() => ({ toggleMenu: value })),
  setToggleSearch: (value: boolean) => set(() => ({ toggleSearch: value })),
}));

export const useAppModal = create<AppModalState>((set) => ({
  modals: {},
  setModalOpen: (key: string, value: boolean) =>
    set((state) => ({
      modals: { ...state.modals, [key]: value },
    })),
}));
