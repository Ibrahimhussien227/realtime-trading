import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  loading: boolean;
}

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="py-3 px-4"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="py-3 px-4"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-3 mt-2 bg-black text-white"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
