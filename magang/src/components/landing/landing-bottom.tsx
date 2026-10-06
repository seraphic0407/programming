type LandingBottomProps = {
  currentSlide: number;
  totalSlides: number;
};

const LandingBottom = ({ currentSlide, totalSlides }: LandingBottomProps) => {
  return (
    <>
      <div className="landing-scroll">
        <span>SCROLL TO EXPLORE</span>
        <i />
      </div>

      <div className="landing-bottom-text">MUSICFEAST</div>

      <div className="landing-number">
        {String(currentSlide + 1).padStart(2, "0")} —{" "}
        {String(totalSlides).padStart(2, "0")}
      </div>
    </>
  );
};

export default LandingBottom;
