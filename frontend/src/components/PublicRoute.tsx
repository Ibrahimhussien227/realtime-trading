import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "@/store/auth/authStore";

export default function PublickRoute() {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return <p>Loading...</p>;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
