export type RSVPStatus = 'Pending' | 'Attending' | 'Not Attending';

export interface Event {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD format, e.g., '2023-12-25'
  time: string; // HH:MM format, e.g., '18:00'
  location: string;
  description: string;
  guestIds: string[];
  taskIds: string[];
}

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  email?: string;
  phone?: string;
  rsvpStatus: RSVPStatus;
}

export interface Task {
  id: string;
  eventId: string;
  description: string;
  isCompleted: boolean;
  dueDate?: string; // YYYY-MM-DD format, optional
}
