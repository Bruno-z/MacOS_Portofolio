import { create } from "zustand";

const useMCStore = create((set) => ({
    isActive: false,
    savedPositions: {}, // { [windowKey]: { x, y } }
    enter: (savedPositions) => set({ isActive: true, savedPositions }),
    exit: () => set({ isActive: false, savedPositions: {} }),
}));

export default useMCStore;
