import LandingStats from "./landing-stats";

const LandingContent = () => {
  return (
    <div className="landing-content">
      <p className="landing-eyebrow">EXPERIENCE THE MUSIC</p>

      <h1 className="landing-title">
        <span>Let the Rhythm</span>
        <span>
          Be Your <em>Wings.</em>
        </span>
      </h1>

      <p className="landing-description">
        Explore a world of music, lights, and unforgettable moments.
      </p>

      <a href="/login" className="landing-explore">
        <span>Explore</span>
        <strong>→</strong>
      </a>

      <LandingStats />
    </div>
  );
};

export default LandingContent;
