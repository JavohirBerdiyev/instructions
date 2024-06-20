// authStore.js
import create from "zustand";

const useAuthStore = create((set) => ({
  email: "",
  password: "",
  setCredentials: (email, password) => set({ email, password }),
}));

export default useAuthStore;
