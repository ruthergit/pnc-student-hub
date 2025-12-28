// store/useLoadingStore.ts
import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  start: () => void;
  stop: () => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  start: () => set({ isLoading: true }),
  stop: () => set({ isLoading: false }),
}));

export default useLoadingStore;
