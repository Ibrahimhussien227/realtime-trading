import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/form/LoginForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, loading, error } = useAuth();

  const handleLogin = (data: { email: string; password: string }) => {
    login(data.email, data.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Login
          </CardTitle>
        </CardHeader>
        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}
        <CardContent>
          <LoginForm onSubmit={handleLogin} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}
