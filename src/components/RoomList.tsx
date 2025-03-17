"use client";

import { Room } from "@/types";

interface RoomListProps {
  rooms: Room[];
  onSelect: (room: Room) => void;
}

export default function RoomList({ rooms, onSelect }: RoomListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
          onClick={() => onSelect(room)}
        >
          <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
          <p className="text-gray-600">Capacidade: {room.capacity} pessoas</p>
          <div className="mt-2"></div>
        </div>
      ))}
    </div>
  );
}
