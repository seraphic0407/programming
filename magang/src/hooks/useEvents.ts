import { useEffect, useState } from "react";
import { getEvents, type Event } from "../service/event.service";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getEvents();

        setEvents(data);
      } catch (error) {
        console.error("Gagal mengambil data event:", error);
        setError("Data event gagal dimuat.");
      } finally {
        setLoading(false);
      }
    };

    void loadEvents();
  }, []);

  return {
    events,
    loading,
    error,
  };
};
