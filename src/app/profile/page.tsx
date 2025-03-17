"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "João Silva",
    email: "joao.silva@empresa.com",
    password: "",
  });

  const handleSave = () => {
    console.log("Dados salvos:", userData);
    alert("Alterações salvas com sucesso!");
  };

  const handleLogout = () => {};

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Meu Perfil
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-0">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Alterar Senha
              </label>
              <input
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nova senha"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                Deixe em branco para manter a senha atual
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2 border-t pt-2 text-center">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Salvar Alterações
          </button>

          <button
            onClick={handleLogout}
            className="ml-1 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}
