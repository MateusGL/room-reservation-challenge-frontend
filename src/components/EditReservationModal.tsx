import { Reservation } from "@/types";

interface EditReservationModalProps {
  reservation: Reservation;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onReservationChange: (reservation: Reservation) => void;
}

export const EditReservationModal: React.FC<EditReservationModalProps> = ({
  reservation,
  onClose,
  onSave,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onReservationChange,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-black text-xl font-bold mb-4">Editar Reserva</h2>
        <form onSubmit={onSave}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Sala
            </label>
            <input
              type="text"
              value={reservation.room.name}
              onChange={(e) =>
                onReservationChange({
                  ...reservation,
                  room: { ...reservation.room, name: e.target.value },
                })
              }
              className="text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Horário de Início
            </label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => onStartTimeChange(e.target.value)}
              className="text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Horário de Término
            </label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => onEndTimeChange(e.target.value)}
              className="text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Salvar Alterações
            </button>            
          </div>
        </form>
      </div>
    </div>
  );
};
