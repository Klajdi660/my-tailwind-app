import { create } from "zustand";
import { AppUtilState, AppModalState, NavScrollTriggerState } from "../types";

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
  modalOpen: false,
  setModalOpen: (value: boolean) => set(() => ({ modalOpen: value })),
}));
