import { useState } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "../../components/navbar";
import { EventCard } from "../../components/event-card";
import { Footer } from "../../components/footer";
import { HomeHero } from "../../components/home/home-hero";
import { Preview } from "../../components/preview";

import { useEvents } from "../../hooks/useEvents";
import { galleryItems } from "../../data/gallery";
import { formatDate } from "../../utils/formatDate";

import "./home.css";

export const Home = () => {
  const { events, loading, error } = useEvents();
  const [eventSlide, setEventSlide] = useState(0);
  const eventPreview = events.slice(0, 6);
  const eventTotalSlides = Math.ceil(eventPreview.length / 3);
  const visibleEvents = eventPreview.slice(eventSlide * 3, eventSlide * 3 + 3);
  const nextEventSlide = () => {
    setEventSlide((current) => Math.min(current + 1, eventTotalSlides - 1));
  };
  const prevEventSlide = () => {
    setEventSlide((current) => Math.max(current - 1, 0));
  };
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <HomeHero />
        <section className="home-section events-section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">EXPERIENCE</p>
              <h2>Upcoming Events</h2>
            </div>
            <div className="preview-controls">
              <button
                type="button"
                className="preview-arrow"
                onClick={prevEventSlide}
                disabled={eventSlide === 0}
                aria-label="Previous events"
              >
                ←
              </button>
              <button
                type="button"
                className="preview-arrow"
                onClick={nextEventSlide}
                disabled={eventSlide >= eventTotalSlides - 1}
                aria-label="Next events"
              >
                →
              </button>
            </div>
          </div>
          {loading && <div className="home-message">Loading events...</div>}
          {error && <div className="home-message error">{error}</div>}
          {!loading && !error && eventPreview.length > 0 && (
            <>
              <div className="event-grid">
                {visibleEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/event?id=${event.id}`}
                    className="home-event-link"
                  >
                    <EventCard
                      title={event.title}
                      date={
                        event.startDate === event.endDate
                          ? formatDate(event.startDate)
                          : `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
                      }
                      location={`${event.location}, ${event.city}`}
                      price={Number(event.price)}
                      image={event.imageUrl ?? ""}
                    />
                  </Link>
                ))}
              </div>
              {eventTotalSlides > 1 && (
                <div className="preview-dots">
                  {Array.from({
                    length: eventTotalSlides,
                  }).map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      className={index === eventSlide ? "active" : ""}
                      onClick={() => setEventSlide(index)}
                      aria-label={`Event slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
          {!loading && !error && eventPreview.length === 0 && (
            <div className="home-message">Belum ada event tersedia.</div>
          )}
        </section>
        <section className="home-section gallery-section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">MEMORIES</p>
              <h2>Moments from Our Community</h2>
            </div>
          </div>
          <Preview
            items={galleryItems}
            visibleCount={3}
            renderItem={(item) => (
              <Link to={`/gallery?item=${item.id}`} className="gallery-card">
                {item.type === "image" ? (
                  <img src={item.media} alt="MusicFeast moment" />
                ) : (
                  <video
                    src={item.media}
                    muted
                    playsInline
                    preload="metadata"
                  />
                )}
                <span className="gallery-overlay" />
                {item.type === "video" && (
                  <span className="gallery-play">▶</span>
                )}
                <span className="gallery-spark">✦</span>
              </Link>
            )}
          />
        </section>
        <section className="home-highlights">
          <div className="highlight-item">
            <span className="highlight-icon">♫</span>
            <div>
              <strong>Curated Events</strong>
              <p>Quality events for every music lover.</p>
            </div>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">♧</span>
            <div>
              <strong>Amazing Community</strong>
              <p>Meet people who share the same vibe.</p>
            </div>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">◇</span>
            <div>
              <strong>Easy Ticketing</strong>
              <p>Secure and simple booking.</p>
            </div>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">✦</span>
            <div>
              <strong>Unforgettable Moments</strong>
              <p>More than events, it’s a journey.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
