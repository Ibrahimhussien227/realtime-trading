import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "@/store/auth/authStore";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
