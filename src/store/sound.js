import { create } from "zustand";

const useSoundStore = create((set) => ({
    isMuted: false,
    toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
}));

export default useSoundStore;
