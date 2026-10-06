const API_URL = "http://localhost:3000/api/v1";

export type Event = {
  id: number;
  title: string;
  genre: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  city: string;
  price: string;
  imageUrl: string | null;
  ticketAvailable: boolean;
  source: string;
  externalId: string | null;
  eventUrl: string | null;
  syncedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data event");
  }

  const result = await response.json();

  return result.data;
};

export const getEventById = async (id: number): Promise<Event> => {
  const response = await fetch(`${API_URL}/events/${id}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil detail event");
  }

  const result = await response.json();

  return result.data;
};
