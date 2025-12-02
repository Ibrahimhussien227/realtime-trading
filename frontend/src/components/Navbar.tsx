import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { logout, loading } = useAuth();

  return (
    <header className="bg-card border-b border-border p-4 flex items-center justify-between shadow-md">
      <h1 className="text-2xl font-bold text-primary">
        Realtime Trading Dashboard
      </h1>
      <Button
        variant="destructive"
        size="sm"
        type="button"
        disabled={loading}
        onClick={() => logout()}
      >
        {loading ? "Logging out..." : "Logout"}
      </Button>
    </header>
  );
};

export default Navbar;
