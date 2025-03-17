"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Reservation, Room } from "@/types";
import RoomList from "@/components/RoomList";
import { listRooms } from "../actions/listRooms.action";
import FilteredReservationList from "@/components/FilteredReservationList";
import { listReservations } from "../actions/listReservations.action";
import { ErrorPage } from "@/components/errorPage";

export default function DashboardPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const data: Room[] = [
        {
          id: "1",
          name: "Sala 1",
          capacity: 10,
          // location: "Andar 1",
          // equipment: ["Projetor", "Tela", "Ar-condicionado"],
        },
        {
          id: "2",
          name: "Sala 2",
          capacity: 20,
        },
        {
          id: "3",
          name: "Sala 3",
          capacity: 15,
        },
      ];
      setRooms(data);

      const result = await listRooms();      
      if (result.error) {
        setError(result.error);
        if (result.status === 401) {
          router.push("/login");
        }
      } else if (result.data) {
        setRooms(result.data);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      const result = await listReservations();
      if (result.error) {
        setError(result.error);
        if (result.status === 401) {
          router.push("/login");
        }
      } else if (result.data) {
        setReservations(result.data as Reservation[]);
      }
    };

    fetchReservations();
  }, []);

  const handleReserva = (room: Room) => {
    sessionStorage.setItem('selectedRoom', JSON.stringify(room));
    router.push(`/dashboard/rooms/${room.id}`,);
  };

  if (error) {
    return <ErrorPage error={error}></ErrorPage>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full py-6 bg-blue-600 text-white text-center text-2xl font-bold">
        Dashboard de Reservas
      </header>
      <main className="p-6">
        <h1 className="text-3xl font-semibold text-gray-900 text-center">
          Salas Disponíveis
        </h1>
        <p className="text-gray-600 mt-2 mb-6">
          Escolha uma sala para fazer sua reserva.
        </p>

        <RoomList rooms={rooms} onSelect={(room) => handleReserva(room)} />

        <FilteredReservationList
          reservations={reservations}
        ></FilteredReservationList>
      </main>
    </div>
  );
}
