"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Room } from "@/types";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

export default function RoomPage() {
  const params = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [reservationStatus, setReservationStatus] = useState<string | null>(
    null
  );

  const availableTimes = [
    { start: "08:00", end: "09:00" },
    { start: "09:00", end: "10:00" },
    { start: "10:00", end: "11:00" },
    { start: "14:00", end: "15:00" },
    { start: "16:00", end: "17:00" },
    { start: "17:00", end: "18:00" },
  ];
  

  useEffect(() => {
    const fetchRoom = () => {
      const rooms: Room[] = [
        {
          id: "1",
          name: "Sala 1",
          capacity: 10,
          location: "Andar 1",
          equipment: ["Projetor", "Tela", "Ar-condicionado"],
        },
        {
          id: "2",
          name: "Sala 2",
          capacity: 20,
          location: "Andar 2",
          equipment: ["Computador", "Quadro branco"],
        },
        {
          id: "3",
          name: "Sala 3",
          capacity: 15,
          location: "Andar 3",
          equipment: ["Mesa de conferência", "Cadeiras"],
        },
      ];
      const selectedRoom = rooms.find((r) => r.id === params.id);
      if (selectedRoom) {
        setRoom(selectedRoom);
      } else {
        setReservationStatus("Sala não encontrada.");
      }
    };
    fetchRoom();
  }, [params.id]);

  const validateTimeRange = (start: string, end: string): boolean => {
    if (!start || !end) return false;
    const startHour = parseInt(start.split(":")[0]);
    const endHour = parseInt(end.split(":")[0]);
    return startHour < endHour && endHour - startHour >= 1;
  };

  const handleReserve = () => {
    if (!selectedDate) {
      setReservationStatus("Por favor, selecione uma data.");
      return;
    }
    if (!startTime || !endTime) {
      setReservationStatus("Por favor, selecione o horário de início e fim.");
      return;
    }
    if (!validateTimeRange(startTime, endTime)) {
      setReservationStatus("O horário deve ter pelo menos 1 hora de duração.");
      return;
    }
    setReservationStatus(
      `Sala ${
        room?.name
      } reservada para ${selectedDate.toLocaleDateString()} de ${startTime} até ${endTime}`
    );
  };

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Carregando dados da sala...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full py-6 text-black text-center text-2xl font-bold">
        Detalhes da Sala {room?.name}
      </header>
      <main className="p-6">
        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Coluna Esquerda - Informações da Sala */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-900">
              {room?.name}
            </h2>
            <p className="text-gray-600 mt-2">
              Capacidade: {room?.capacity} pessoas
            </p>
            <p className="text-gray-600">Localização: {room?.location}</p>
            <div className="mt-4">
              <p className="font-semibold">Equipamento:</p>
              <ul className="list-disc pl-5 text-gray-600">
                {room?.equipment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button
                onClick={handleReserve}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Reservar Sala
              </button>
              {reservationStatus && (
                <p className="mt-4 text-center text-gray-700">
                  {reservationStatus}
                </p>
              )}
            </div>
          </div>

          {/* Coluna Direita - Calendário e Horários */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <div className="sticky top-6">
              <label className="block text-gray-700 mb-4 text-lg font-semibold">
                Selecione a data e horário:
              </label>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Calendário */}
                <div className="lg:w-2/4">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={addDays(new Date(), 1)}
                    inline
                    calendarClassName="!w"
                    dateFormat="Pp"
                  />
                </div>

                {/* Seção de Horários */}
                <div className="lg:w-2/4 flex flex-col gap-4">
                  {/* Inputs de Horário */}
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">
                      Horário de início:
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">
                      Horário de fim:
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Lista de Horários Disponíveis */}
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2 text-gray-700">
                      Horários disponíveis:
                    </h3>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {availableTimes.map((time, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setStartTime(time.start);
                            setEndTime(time.end);
                          }}
                          className="text-sm p-2 border rounded hover:bg-blue-50 transition-colors"
                        >
                          {time.start} - {time.end}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
