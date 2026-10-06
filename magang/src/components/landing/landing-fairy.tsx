import fairyAnimation from "../../assets/fairy-magic.mp4";

const LandingFairy = () => {
  return (
    <>
      <div className="landing-fairy-video">
        <video src={fairyAnimation} autoPlay loop muted playsInline />

        <div className="fairy-video-glow" />
      </div>

      <div className="landing-fairy-particles">
        <span className="fairy-particle particle-1" />
        <span className="fairy-particle particle-2" />
        <span className="fairy-particle particle-3" />
        <span className="fairy-particle particle-4" />
        <span className="fairy-particle particle-5" />
        <span className="fairy-particle particle-6" />
        <span className="fairy-particle particle-7" />
        <span className="fairy-particle particle-8" />

        <span className="fairy-spark spark-1">✦</span>
        <span className="fairy-spark spark-2">✧</span>
        <span className="fairy-spark spark-3">✦</span>
        <span className="fairy-spark spark-4">✧</span>
        <span className="fairy-spark spark-5">✦</span>
      </div>
    </>
  );
};

export default LandingFairy;
