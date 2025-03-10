"use client";

import { useState } from "react";

interface Reservation {
  id: string;
  room: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "canceled" | "completed";
}

export default function MyReservations() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past" | "canceled">("all");
  
  // Dados simulados
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      room: "Sala de Reunião A",
      date: "2024-03-20",
      time: "14:00 - 15:30",
      status: "confirmed"
    },
    {
      id: "2",
      room: "Auditório Principal",
      date: "2024-03-22",
      time: "10:00 - 11:00",
      status: "pending"
    },
    {
      id: "3",
      room: "Sala de Treinamento B",
      date: "2024-03-18",
      time: "09:00 - 10:30",
      status: "completed"
    },
    {
      id: "4",
      room: "Sala de Conferência C",
      date: "2024-03-25",
      time: "16:00 - 17:00",
      status: "canceled"
    }
  ]);

  const filteredReservations = reservations.filter(res => {
    if (filter === "all") return true;
    if (filter === "upcoming") return ["confirmed", "pending"].includes(res.status);
    if (filter === "past") return res.status === "completed";
    return res.status === filter;
  });

  const cancelReservation = (id: string) => {
    setReservations(reservations.map(res => 
      res.id === id ? {...res, status: "canceled"} : res
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Minhas Reservas
            </h1>
            
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-4 py-2 border rounded-lg bg-white text-black"
              >
                <option value="all">Todas</option>
                <option value="upcoming">Próximas</option>
                <option value="past">Passadas</option>
                <option value="canceled">Canceladas</option>
              </select>
              
              <button
                onClick={() => window.location.href = "/dashboard"}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Nova Reserva
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden text-black">
            <div className="hidden md:grid grid-cols-12 bg-gray-400 p-4 text-sm font-semibold text-gray-600">
              <div className="col-span-4">Sala</div>
              <div className="col-span-2">Data</div>
              <div className="col-span-3">Horário</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Ações</div>
            </div>

            {filteredReservations.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Nenhuma reserva encontrada
              </div>
            ) : (
              filteredReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-t hover:bg-gray-500 transition-colors"
                >
                  <div className="md:col-span-4 font-medium">
                    {reservation.room}
                  </div>
                  
                  <div className="md:col-span-2">
                    {new Date(reservation.date).toLocaleDateString("pt-BR")}
                  </div>
                  
                  <div className="md:col-span-3">
                    {reservation.time}
                  </div>
                  
                  <div className="md:col-span-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      reservation.status === "confirmed" ? "bg-green-100 text-green-800" :
                      reservation.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      reservation.status === "canceled" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {{
                        confirmed: "Confirmada",
                        pending: "Pendente",
                        canceled: "Cancelada",
                        completed: "Concluída"
                      }[reservation.status]}
                    </span>
                  </div>
                  
                  <div className="md:col-span-1 flex gap-2">
                    {["confirmed", "pending"].includes(reservation.status) && (
                      <>
                        <button
                          onClick={() => cancelReservation(reservation.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Cancelar"
                        >
                          ✕
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          title="Editar"
                        >
                          ✎
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}