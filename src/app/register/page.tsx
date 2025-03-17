"use client";

import { registerUser } from "../actions/registerUser.action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {useActionState} from "react"

const initialState = {
  fieldErrors: {} as Record<string, string[]>,
  serverError: "",
  success: false,
};

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard?success=true");
    }
  }, [state.success, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Criar Nova Conta
          </h1>

          {state.serverError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {state.serverError}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-black ${
                  state.fieldErrors?.name ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {state.fieldErrors?.name && (
                <p className="text-red-500 text-xs mt-1">{state.fieldErrors.name.join(", ")}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-black ${
                  state.fieldErrors?.email ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {state.fieldErrors?.email && (
                <p className="text-red-500 text-xs mt-1">{state.fieldErrors.email.join(", ")}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Senha
              </label>
              <input
                type="password"
                name="password"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-black ${
                  state.fieldErrors?.password ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {state.fieldErrors?.password && (
                <p className="text-red-500 text-xs mt-1">{state.fieldErrors.password.join(", ")}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Confirme a Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-black ${
                  state.fieldErrors?.confirmPassword ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {state.fieldErrors?.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {state.fieldErrors.confirmPassword.join(", ")}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              disabled={state.success}
            >
              Registrar
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Faça login aqui
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}