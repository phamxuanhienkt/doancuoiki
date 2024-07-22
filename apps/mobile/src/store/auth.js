import create from 'zustand';

const useAuthStore = create(set => ({
  user: undefined,
  isLogin: false,
  updateUser: (user) => set(() => ({ user })),
  updateIsLogin: (isLogin) => set(() => ({ isLogin })),
}));

export default useAuthStore;
