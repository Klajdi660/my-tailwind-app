import { create } from "zustand";
import {
  AppUtilState,
  AppModalState,
  SubmittingState,
  ProfilePhotoState,
  NavScrollTriggerState,
} from "../types";

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

export const useProfilePhoto = create<ProfilePhotoState>((set) => ({
  files: null,
  isUpdatingProfileImg: false,
  setFiles: (value: any) => set(() => ({ files: value })),
  setIsUpdatingProfileImg: (value: boolean) =>
    set(() => ({ isUpdatingProfileImg: value })),
}));

export const useSubmitting = create<SubmittingState>((set) => ({
  isSubmitting: false,
  setIsSubmitting: (value: boolean) => set(() => ({ isSubmitting: value })),
}));
