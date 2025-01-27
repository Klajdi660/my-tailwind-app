import { create } from "zustand";
import { AppModalState } from "../types";

export const useAppModal = create<AppModalState>((set) => ({
  modals: {},
  setModalOpen: (key: string, value: boolean) =>
    set((state) => ({
      modals: { ...state.modals, [key]: value },
    })),
  closeAllModals: () =>
    set(() => ({
      modals: {},
    })),
}));
