"use client";

import { useState } from "react";


export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "João Silva",
    email: "joao.silva@empresa.com",
    department: "TI",
    phone: "(11) 99999-9999",
    password: "" // Apenas para exemplo - NÃO armazene senhas assim na prática
  });

  const handleSave = () => {
    // Lógica para salvar alterações
    console.log("Dados salvos:", userData);
    alert("Alterações salvas com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna Esquerda - Informações Pessoais */}
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Foto do Perfil
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <span className="text-gray-500">JP</span>
                  </div>
                  <button className="px-4 py-2 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">
                    Alterar Foto
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Coluna Direita - Informações Adicionais */}
            <div className="mt-10">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Departamento
                </label>
                <input
                  type="text"
                  value={userData.department}
                  onChange={(e) => setUserData({...userData, department: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Alterar Senha
                </label>
                <input
                  type="password"
                  value={userData.password}
                  onChange={(e) => setUserData({...userData, password: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nova senha"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deixe em branco para manter a senha atual
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 border-t pt-2">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}