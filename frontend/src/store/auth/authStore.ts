import { create } from "zustand";

import type { AuthState } from "./types";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  loading: true,
  error: "",
  setAuth: (auth) => set({ isAuthenticated: auth }),
  setLoading: (loading) => set({ loading }),
  setError: (err) => set({ error: err }),
}));
