type LandingSideNavProps = {
  currentSlide: number;
  totalSlides: number;
};

const LandingSideNav = ({ currentSlide, totalSlides }: LandingSideNavProps) => {
  return (
    <div className="landing-slide-nav">
      <span className="landing-slide-arrow">↑</span>

      {Array.from({ length: totalSlides }).map((_, index) => (
        <span
          key={index}
          className={`landing-slide ${currentSlide === index ? "active" : ""}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      ))}

      <span className="landing-slide-arrow">↓</span>
    </div>
  );
};

export default LandingSideNav;
