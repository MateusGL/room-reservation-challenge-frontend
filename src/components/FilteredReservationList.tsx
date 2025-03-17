"use client";

import React, { useState } from "react";
import { Reservation } from "@/types";
import ReservationList from "./ReservationList";

interface FilteredReservationListProps {
  reservations: Reservation[];
}

export default function FilteredReservationList({
  reservations,
}: FilteredReservationListProps) {
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterRoom, setFilterRoom] = useState<string>("");
  const [filterUser, setFilterUser] = useState<string>("");

  const filteredReservations = reservations.filter((reservation) => {
    let matchesDate = true;
    if (filterDate) {
      const selectedDate = new Date(filterDate + "T03:24:00");
      const startDate = new Date(reservation.startTime);
      const endDate = new Date(reservation.endTime);

      matchesDate =
        startDate.toDateString() === selectedDate.toDateString() ||
        endDate.toDateString() === selectedDate.toDateString();
    }

    const matchesRoom = filterRoom
      ? reservation.room.name.toLowerCase().includes(filterRoom.toLowerCase())
      : true;

    const matchesUser = filterUser
      ? reservation.user.name.toLowerCase().includes(filterUser.toLowerCase())
      : true;

    return matchesDate && matchesRoom && matchesUser;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Filtrar Reservas
      </h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-gray-900 text-sm font-medium">
            Data
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* Filtro por Usuário */}
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Usuário
          </label>
          <input
            type="text"
            placeholder="Nome do usuário"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>
        {/* Filtro por Sala */}
        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Sala
          </label>
          <input
            type="text"
            placeholder="Nome da sala"
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Exibe a lista de reservas filtradas */}
      <ReservationList reservations={filteredReservations} />
    </div>
  );
}
