export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  setAuth: (auth: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (err: string) => void;
}
