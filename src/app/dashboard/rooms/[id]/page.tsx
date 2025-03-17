"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Room } from "@/types";
import { ErrorPage } from "@/components/errorPage";
import { listRooms } from "@/app/actions/listRooms.action";
import { createReservation } from "@/app/actions/createReservation.action";

function parseTimeToDate(baseDate: Date, timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  return new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    hours,
    minutes
  );
}

export default function RoomPage() {
  const router = useRouter();
  const params = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [reservationStatus, setReservationStatus] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const suggestionTimes = [
    { start: "08:00", end: "09:00" },
    { start: "09:00", end: "10:00" },
    { start: "10:00", end: "11:00" },
    { start: "14:00", end: "15:00" },
    { start: "16:00", end: "17:00" },
    { start: "17:00", end: "18:00" },
  ];

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const cachedRoom = sessionStorage.getItem("selectedRoom");

        if (cachedRoom) {
          setRoom(JSON.parse(cachedRoom));
          sessionStorage.removeItem("selectedRoom");
          return;
        }

        const result = await listRooms();

        if (result.error) {
          setError(result.error);
        } else {
          const foundRoom = result.data?.find((r: Room) => r.id === params.id);

          if (foundRoom) {
            setRoom(foundRoom);
          } else {
            setError("Sala não encontrada");
          }
        }
      } catch (err: unknown) {
        setError(`Erro ao carregar dados da sala ${err}`);
      }
    };

    loadRoom();
  }, [params.id]);

  const validateTimeRange = (start: string, end: string): boolean => {
    if (!start || !end) return false;
    const startHour = parseInt(start.split(":")[0]);
    const endHour = parseInt(end.split(":")[0]);
    return startHour < endHour && endHour - startHour >= 1;
  };

  const handleReserve = async () => {
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
    console.log(selectedDate, startTime, endTime);
    const reservationData = {
      startTime: parseTimeToDate(new Date(selectedDate), startTime),
      endTime: parseTimeToDate(new Date(selectedDate), endTime),
      roomId: `${params.id}`,
    };

    const result = await createReservation(reservationData);

    if (result.error) {
      setError(result.error);
      if (result.status === 401) {
        router.push("/login");
      }
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

  if (error) {
    return <ErrorPage error={error} />;
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

            <div className="mt-4"></div>
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

              <div className="w-full flex flex-col lg:flex-row gap-6">
                {/* Seção de Horários */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md flex justify-center items-center">
                  <div className="sticky top-6 w-full max-w-lg">
                    <label className="block text-gray-700 mb-4 text-lg font-semibold text-center">
                      Selecione a data e horário:
                    </label>

                    <div className="w-full flex flex-col items-center gap-6">
                      {/* Seção de Horários */}
                      <div className="flex flex-col gap-4 w-full items-center">
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="text-black w-full max-w-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        />

                        {/* Inputs de Horário */}
                        <div className="w-full max-w-xs">
                          <label className="block text-gray-700 mb-2 text-sm text-center">
                            Horário de início:
                          </label>
                          <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                          />
                        </div>

                        <div className="w-full max-w-xs">
                          <label className="block text-gray-700 mb-2 text-sm text-center">
                            Horário de fim:
                          </label>
                          <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                          />
                        </div>

                        {/* Lista de Horários Disponíveis */}
                        <div className="mt-4 w-full max-w-xs">
                          <h3 className="text-sm font-semibold mb-2 text-gray-700 text-center">
                            Sugestão de Horários:
                          </h3>
                          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto text-black">
                            {suggestionTimes.map((time, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setStartTime(time.start);
                                  setEndTime(time.end);
                                }}
                                className="text-sm p-2 border rounded hover:bg-blue-50 transition-colors w-full text-center"
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
