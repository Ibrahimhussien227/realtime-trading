import { useEffect } from "react";
import { useAuthStore } from "@/store/auth/authStore";
import { checkAuthApi } from "@/api/auth";
import { useWSStore } from "@/store/ws/useWSStore";

export function useInitAuth() {
  const { setAuth, setLoading } = useAuthStore();
  const { connectWS } = useWSStore();

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      try {
        const auth = await checkAuthApi();
        setAuth(auth);

        if (auth) {
          connectWS();
        }
      } catch {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);
}
