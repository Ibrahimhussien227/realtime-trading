import { loginApi, logoutApi } from "@/api/auth";
import { useAuthStore } from "@/store/auth/authStore";
import { useWSStore } from "@/store/ws/useWSStore";

export function useAuth() {
  const {
    setAuth,
    setLoading,
    setError,
    isAuthenticated,
    loading,
    error,
  } = useAuthStore();
  const { connectWS, disconnectWS } = useWSStore();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      await loginApi(email, password);
      setAuth(true);
      connectWS();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      setAuth(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError("");
    try {
      await logoutApi();
      setAuth(false);
      disconnectWS();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      setAuth(true);
    } finally {
      setLoading(false);
    }
  };

  return { login, logout, isAuthenticated, loading, error };
}
