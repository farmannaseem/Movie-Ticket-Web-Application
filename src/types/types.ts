export interface Movie {
  id: number;
  name: string;
  username: string;          // add username
  image: string;
  year: string;
  isAuthenticated: boolean;  // add isAuthenticated
}


export interface Ticket {
  id: number;
  movieId: number;
  seatNumber: string;
  movieName: string;
  ticketCount: number;
  time: string;
  date: string;
  amount: number;
  userId: string; // add userId
  newTicket: boolean; // add newTicket to track if it's a new ticket
}
export interface User {
  isAuthenticated: boolean;
  username: string; // add username
}