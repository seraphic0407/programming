import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { EventCard } from "../../components/event-card";
import { EventFilter } from "../../components/event-filter";
import { MusicFeastBackground } from "../../components/musicfeast-background";
import { useEvents } from "../../hooks/useEvents";
import { formatDate } from "../../utils/formatDate";
import "./event.css";

export const Event = () => {
  const navigate = useNavigate();
  const { events, loading, error } = useEvents();

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState("");

  const genres = useMemo(() => {
    return Array.from(
      new Set(events.map((event) => event.genre).filter(Boolean)),
    );
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        event.title.toLowerCase().includes(searchValue) ||
        event.location.toLowerCase().includes(searchValue) ||
        event.city.toLowerCase().includes(searchValue);

      const matchesGenre = !genre || event.genre === genre;

      const matchesDate =
        !date ||
        event.startDate.slice(0, 10) === date ||
        event.endDate.slice(0, 10) === date;

      return matchesSearch && matchesGenre && matchesDate;
    });
  }, [events, search, genre, date]);

  return (
    <MusicFeastBackground>
      <div className="event-page">
        <Navbar />

        <main className="event-main">
          <section className="event-header">
            <div>
              <span className="event-eyebrow">MUSICFEAST EVENTS</span>
              <h1>Find your next event</h1>
              <p>
                Temukan event musik dan pertunjukan yang sesuai dengan
                pengalaman yang kamu cari.
              </p>
            </div>
          </section>

          <section className="event-controls">
            <EventFilter
              search={search}
              genre={genre}
              date={date}
              genres={genres}
              onSearchChange={setSearch}
              onGenreChange={setGenre}
              onDateChange={setDate}
            />
          </section>

          <section className="event-content">
            {loading && (
              <div className="event-state">
                <p>Memuat event...</p>
              </div>
            )}

            {!loading && error && (
              <div className="event-state">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && filteredEvents.length === 0 && (
              <div className="event-state">
                <p>Event tidak ditemukan.</p>
              </div>
            )}

            {!loading && !error && filteredEvents.length > 0 && (
              <div className="event-grid">
                {filteredEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    className="event-card-button"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    <EventCard
                      title={event.title}
                      date={formatDate(event.startDate)}
                      location={`${event.location}, ${event.city}`}
                      price={Number(event.price)}
                      image={event.imageUrl ?? ""}
                    />
                  </button>
                ))}
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </MusicFeastBackground>
  );
};
