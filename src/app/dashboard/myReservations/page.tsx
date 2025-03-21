"use client";

import { useEffect, useState } from "react";
import { Reservation } from "@/types";
import { EditReservationModal } from "@/components/EditReservationModal";
import { EditReservationsList } from "@/components/EditReservationList";
import { listMyReservations } from "@/app/actions/listMyReservations.action";
import { useRouter } from "next/navigation";
import { ErrorPage } from "@/components/errorPage";
import { deleteReservation } from "@/app/actions/deleteReservation.action";
import { editReservation } from "@/app/actions/editReservation.action";

export default function MyReservations() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const result = await listMyReservations();
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

  const filteredReservations = reservations.filter((res) => {
    const now = new Date();
    if (filter === "all") return true;
    if (filter === "upcoming") return new Date(res.startTime) > now;
    return res.endTime <= now;
  });

  const cancelReservation = async (id: string) => {
    setReservations(reservations.filter((res) => res.id !== id));

    const result = await deleteReservation(id);
    if (result.error) {
      setError(result.error);
      if (result.status === 401) {
        router.push("/login");
      }
    }
  };

  const handleEditClick = (reservation: Reservation) => {
    const formatTime = (date: Date) => {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    setEditingReservation(reservation);
    setStartTime(formatTime(new Date(reservation.startTime)));
    setEndTime(formatTime(new Date(reservation.endTime)));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReservation) {
      if (startTime >= endTime) {
        alert("O horário de término deve ser após o início");
        return;
      }

      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      const newStartTime = new Date(editingReservation.startTime);
      newStartTime.setHours(startHours, startMinutes);

      const newEndTime = new Date(editingReservation.endTime);
      newEndTime.setHours(endHours, endMinutes);

      const updatedReservation = {
        ...editingReservation,
        startTime: newStartTime,
        endTime: newEndTime,
      };

      const result = await editReservation(editingReservation.id, {
        startTime: newStartTime,
        endTime: newEndTime,
      });
      if (result.error) {
        setError(result.error);
        return;
      }

      setReservations(
        reservations.map((res) =>
          res.id === updatedReservation.id ? updatedReservation : res
        )
      );

      setEditingReservation(null);
    }
  };

  if (error) {
    return <ErrorPage error={error}></ErrorPage>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {editingReservation && (
        <EditReservationModal
          reservation={editingReservation}
          onClose={() => setEditingReservation(null)}
          onSave={handleEditSubmit}
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />
      )}

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
              </select>

              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Nova Reserva
              </button>
            </div>
          </div>

          <EditReservationsList
            reservations={filteredReservations}
            onCancel={cancelReservation}
            onEdit={handleEditClick}
          />
        </div>
      </main>
    </div>
  );
}
