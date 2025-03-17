"use client";

import { Reservation } from "@/types";
import React from "react";

interface ReservationListProps {
  reservations: Reservation[];
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations }) => {
  return (

    <div className="overflow-x-auto text-gray-100 mt-10">
      <h1 className="text-3xl font-semibold text-gray-900 text-center">
          Lista de Reservas
        </h1>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Início</th>
            <th className="py-2 px-4 text-left">Término</th>
            <th className="py-2 px-4 text-left">Usuário</th>
            <th className="py-2 px-4 text-left">Sala</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="border-t text-gray-900">
              <td className="py-2 px-4">{reservation.id}</td>
              <td className="py-2 px-4">
                {new Date(reservation.startTime).toLocaleString()}
              </td>
              <td className="py-2 px-4">
                {new Date(reservation.endTime).toLocaleString()}
              </td>
              <td className="py-2 px-4">{reservation.user.name}</td>
              <td className="py-2 px-4">{reservation.room.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
