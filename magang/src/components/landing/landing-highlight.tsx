type LandingHighlightProps = {
  image: string;
  title: string;
  date: string;
  location: string;
};

const LandingHighlight = ({
  image,
  title,
  date,
  location,
}: LandingHighlightProps) => {
  return (
    <div className="landing-highlight">
      <div className="landing-highlight-bar" />

      <div className="landing-highlight-image">
        <img src={image} alt={title} />

        <div className="landing-highlight-image-overlay" />
      </div>

      <div className="landing-highlight-info">
        <p>UPCOMING EVENT</p>

        <h2>{title}</h2>

        <span>{date}</span>

        <small>{location}</small>
      </div>

      <div className="landing-highlight-action">
        <span>→</span>
      </div>
    </div>
  );
};

export default LandingHighlight;
