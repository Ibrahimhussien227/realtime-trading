import { Route, Routes } from "react-router";

import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublickRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";
import { useInitAuth } from "./hooks/useInitAuth";

export default function App() {
  useInitAuth();
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <DashboardPage />
            </>
          }
        />
      </Route>

      <Route element={<PublickRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}
