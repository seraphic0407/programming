import "./event-card.css";

type EventCardProps = {
  title: string;
  date: string;
  location: string;
  price: number;
  image: string;
};

export const EventCard = ({
  title,
  date,
  location,
  price,
  image,
}: EventCardProps) => {
  return (
    <article className="event-card">
      <div className="event-card-image">
        {image ? (
          <img
            src={image}
            alt={title}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="event-card-placeholder">
            <div className="music-symbol">♪</div>
            <span>MUSICFEAST</span>
          </div>
        )}

        <div className="event-card-overlay" />

        <span className="event-card-badge">MUSIC EVENT</span>
      </div>

      <div className="event-card-content">
        <h3>{title}</h3>

        <div className="event-card-info">
          <p>
            <span>DATE</span>
            {date}
          </p>

          <p>
            <span>LOCATION</span>
            {location}
          </p>
        </div>

        <div className="event-card-bottom">
          <strong>Rp {price.toLocaleString("id-ID")}</strong>

          <span className="event-card-arrow">→</span>
        </div>
      </div>
    </article>
  );
};
