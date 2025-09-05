
import { create } from 'zustand';

type UIState = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  activeBottomNavItem: string;
  setActiveBottomNavItem: (name: string) => void;
};

const useUIState = create<UIState>((set) => ({
  activeFilter: 'All',
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  activeBottomNavItem: 'Home',
  setActiveBottomNavItem: (name) => set({ activeBottomNavItem: name }),
}));

export default useUIState;
