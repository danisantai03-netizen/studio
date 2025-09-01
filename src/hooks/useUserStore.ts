
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
  clearUser: () => void;
}

const initialState = {
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
};


const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setName: (name) => set({ name }),
      setAvatarUrl: (url) => set({ avatarUrl: url }),
      setPhone: (phone) => set({ phone }),
      setAddress: (address) => set((state) => ({ address: { ...state.address, ...address } })),
      clearUser: () => set({ ...initialState, userId: '', name: '', email: '', phone: '' }), // Reset to initial but clear sensitive info
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useUserStore;
