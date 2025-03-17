"use client";
import Link from "next/link";
import { loginUser } from "../actions/login.action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  errors: {},
  message: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(loginUser, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <p className="text-gray-600 text-center mb-6">
          Acesse sua conta para gerenciar reservas
        </p>

        {state.message && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                state.errors?.email
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-blue-500"
              }`}
              required
            />
            {state.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.email.join(", ")}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                state.errors?.password
                  ? "border-red-500"
                  : "focus:ring-2 focus:ring-blue-500"
              }`}
              required
            />
            {state.errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.password.join(", ")}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <Link href="/register">
          <p className="text-gray-600 text-center mt-4">
            Não tem uma conta?{" "}
            <span className="text-blue-500 hover:underline">Cadastre-se</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
