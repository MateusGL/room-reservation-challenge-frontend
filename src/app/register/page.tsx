
"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"]
});

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    
    try {
      const result = schema.safeParse(formData);
      if (!result.success) {
        const errorMap = result.error.flatten().fieldErrors;
        const formattedErrors = Object.entries(errorMap).reduce((acc, [key, value]) => {
          acc[key] = value?.join(", ") || "";
          return acc;
        }, {} as Record<string, string>);
        setErrors(formattedErrors);
        return;
      }

      // Simular chamada à API
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro no registro");
      }

      router.push("/login?success=true");
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Ocorreu um erro desconhecido");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Criar Nova Conta
          </h1>

          {serverError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-black ${
                  errors.name ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-black ${
                  errors.email ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-black ${
                  errors.password ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Confirme a Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none text-black ${
                  errors.confirmPassword ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-black"
            >
              Registrar
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Já tem uma conta?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Faça login aqui
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}