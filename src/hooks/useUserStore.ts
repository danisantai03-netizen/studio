
import { create } from 'zustand';

interface UserState {
  name: string;
  avatarUrl: string;
  email: string;
  phone: string;
  userId: string;
  address: {
    province: string;
    city: string;
    subdistrict: string;
    village: string;
    fullAddress: string;
  };
  setName: (name: string) => void;
  setAvatarUrl: (url: string) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: Partial<UserState['address']>) => void;
}

const useUserStore = create<UserState>((set) => ({
  name: 'Alex Green',
  avatarUrl: '/assets/avatars/alex-green.jpg',
  email: 'alex.green@example.com',
  phone: '81234567890',
  userId: '1289-4720-3482',
  address: {
    province: '',
    city: '',
    subdistrict: '',
    village: '',
    fullAddress: '',
  },
  setName: (name) => set({ name }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  setPhone: (phone) => set({ phone }),
  setAddress: (address) => set((state) => ({ address: { ...state.address, ...address } })),
}));

export default useUserStore;
