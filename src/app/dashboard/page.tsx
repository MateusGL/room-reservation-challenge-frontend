"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Room } from "@/types";  // Importe a interface Room

export default function DashboardPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Simulação de busca de salas (substitua por uma chamada real de API)
    const fetchRooms = () => {
      const data: Room[] = [
        { id: "1", name: "Sala 1", capacity: 10, location: "Andar 1", equipment: ["Projetor", "Tela", "Ar-condicionado"] },
        { id: "2", name: "Sala 2", capacity: 20, location: "Andar 2", equipment: ["Computador", "Quadro branco"] },
        { id: "3", name: "Sala 3", capacity: 15, location: "Andar 3", equipment: ["Mesa de conferência", "Cadeiras"] },
      ];
      setRooms(data);
    };

    fetchRooms();
  }, []);

  const handleReserva = (id: string) => {
    // Redireciona para a página de reserva da sala
    router.push(`/dashboard/rooms/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full py-6 bg-blue-600 text-white text-center text-2xl font-bold">
        Dashboard de Reservas
      </header>

      <main className="p-6">
        <h1 className="text-3xl font-semibold text-gray-900">Salas Disponíveis</h1>
        <p className="text-gray-600 mt-2 mb-6">Escolha uma sala para fazer sua reserva.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
              onClick={() => handleReserva(room.id)}
            >
              <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
              <p className="text-gray-600">Capacidade: {room.capacity} pessoas</p>
              <p className="text-gray-600">Localização: {room.location}</p>
              <div className="mt-2">
                <p className="font-semibold">Equipamento:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  {room.equipment.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
