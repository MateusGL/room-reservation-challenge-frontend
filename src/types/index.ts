export interface Room {
  id: string;
  name: string;
  capacity: number;
  location: string;
  equipment: string[];
}

export interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  type: "ADMIN" | "USER";
}
