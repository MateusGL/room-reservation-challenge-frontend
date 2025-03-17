export interface Room {
  id: string;
  name: string;
  capacity: number;
}

export interface Reservation {
  id: string;
  startTime: Date;
  endTime: Date;
  room: {name: string};
  user: {name: string};
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}
