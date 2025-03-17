import { Reservation } from "@/types";

interface ReservationsListProps {
  reservations: Reservation[];
  onCancel: (id: string) => void;
  onEdit: (reservation: Reservation) => void;
}

export function EditReservationsList({ reservations, onCancel, onEdit }: ReservationsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden text-black">
      <div className="hidden md:grid grid-cols-12 bg-gray-400 p-4 text-sm font-semibold text-gray-600">
        <div className="col-span-4">Sala</div>
        <div className="col-span-3">Data</div>
        <div className="col-span-3">Horário</div>
        <div className="col-span-2">Ações</div>
      </div>

      {reservations.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Nenhuma reserva encontrada
        </div>
      ) : (
        reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-t hover:bg-gray-50 transition-colors"
          >
            <div className="md:col-span-4 font-medium">
              {reservation.room.name}
            </div>

            <div className="md:col-span-3">
              {new Date(reservation.startTime).toLocaleDateString("pt-BR")}
            </div>

            <div className="md:col-span-3">
              {new Date(reservation.startTime).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(reservation.endTime).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="md:col-span-2 flex gap-2">
              {new Date(reservation.startTime) > new Date() && (
                <>
                  <button
                    onClick={() => onCancel(reservation.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Cancelar"
                  >
                    ✕
                  </button>
                  <button
                    onClick={() => onEdit(reservation)}
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
  );
}