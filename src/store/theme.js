import { create } from "zustand";

// Restore saved theme before React renders (no flash)
const saved = localStorage.getItem('theme') === 'dark';
if (saved) document.documentElement.classList.add('dark');

const useThemeStore = create((set) => ({
    isDark: saved,
    toggleTheme: () =>
        set((state) => {
            const next = !state.isDark;
            document.documentElement.classList.toggle("dark", next);
            localStorage.setItem('theme', next ? 'dark' : 'light');
            return { isDark: next };
        }),
}));

export default useThemeStore;
