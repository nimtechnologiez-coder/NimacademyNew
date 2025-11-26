import React, { useState, useEffect } from "react";
import NimHero from "./HeroSection";
import VerifiedHero from "./verifiedhero";
import GrowthBanner from "./growthhero";
import "../Style/heroslider.css";

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  // AUTO ROTATION (5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 3 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-slider">
      <div className="hero-slide-container">
        {activeSlide === 1 && <NimHero />}
        {activeSlide === 2 && <VerifiedHero />}
        {activeSlide === 3 && <GrowthBanner />}
      </div>
    </div>
  );
};

export default HeroSlider;

