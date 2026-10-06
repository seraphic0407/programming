import { useState } from "react";

import LandingBackground from "../../components/landing/landing-background";
import LandingBottom from "../../components/landing/landing-bottom";
import LandingContent from "../../components/landing/landing-content";
import LandingFairy from "../../components/landing/landing-fairy";
import LandingLogo from "../../components/landing/landing-logo";
import LandingPulse from "../../components/landing/landing-pulse";
import LandingSideNav from "../../components/landing/landing-sidenav";

import { Footer } from "../../components/footer";

import "./landing.css";

const Landing = () => {
  const [currentSlide] = useState(0);

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <LandingBackground />

        <LandingFairy />

        <LandingLogo />

        <LandingContent />

        <LandingPulse />

        <LandingSideNav currentSlide={currentSlide} totalSlides={3} />

        <LandingBottom currentSlide={currentSlide} totalSlides={3} />
      </section>

      <Footer />
    </main>
  );
};

export { Landing };
