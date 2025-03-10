"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Simulação de autenticação (substitua por lógica real)
    if (email === "admin@example.com" && password === "password") {
      router.push("/dashboard"); // Redireciona para o dashboard
    } else {
      alert("Credenciais inválidas! Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <p className="text-gray-600 text-center mb-6">Acesse sua conta para gerenciar reservas</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Não tem uma conta? <a href="#" className="text-blue-500 hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
