import musicfeastBg from "../../assets/musicfeast-bg.png";

const LandingBackground = () => {
  return (
    <>
      <div className="landing-background">
        <img src={musicfeastBg} alt="MusicFeast background" />
      </div>

      <div className="landing-overlay" />

      <div className="landing-orb landing-orb-one" />

      <div className="landing-orb landing-orb-two" />

      <div className="landing-lines landing-lines-left" />

      <div className="landing-lines landing-lines-right" />

      <div className="landing-grid" />
    </>
  );
};

export default LandingBackground;
