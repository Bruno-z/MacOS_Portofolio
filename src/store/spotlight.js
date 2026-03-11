import { create } from "zustand";

const useSpotlightStore = create((set) => ({
    isOpen: false,
    query: "",
    open: () => set({ isOpen: true, query: "" }),
    close: () => set({ isOpen: false, query: "" }),
    setQuery: (query) => set({ query }),
}));

export default useSpotlightStore;
