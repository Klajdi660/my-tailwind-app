import { create } from "zustand";

interface AppUtilState {
  openSwitch: boolean;
  toggleMenu: boolean;
  toggleSearch: boolean;
  setOpenSwitch: (value: boolean) => void;
  setToggleMenu: (value: boolean) => void;
  setToggleSearch: (value: boolean) => void;
}

interface NavScrollTriggerState {
  navScrollTrigger: boolean;
  setNavScrollTrigger: (value: boolean) => void;
}

interface AppModalState {
  isOpen: boolean;
  modalContent: any;
  open: () => void;
  close: () => void;
  setModalContent: (value: any) => void;
}

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
  isOpen: false,
  modalContent: null,
  open: () => ({ isOpen: true }),
  close: () => ({ isOpen: false, modalContent: null }),
  setModalContent: (value: any) => set(() => ({ modalContent: value })),
}));
