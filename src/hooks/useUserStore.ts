
import { create } from 'zustand';

interface UserState {
  name: string;
  avatarUrl: string;
  setName: (name: string) => void;
  setAvatarUrl: (url: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  name: 'Alex Green',
  avatarUrl: 'https://picsum.photos/96/96',
  setName: (name) => set({ name }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
}));

export default useUserStore;
