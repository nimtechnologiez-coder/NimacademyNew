import React, { useState, useEffect } from "react";
import NimHero from "./HeroSection";
import VerifiedHero from "./verifiedhero";
import GrowthBanner from "./growthhero";
import "../Style/heroslider.css";

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size once on load & on resize
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ❌ Disable slider on mobile
  // ✔ only desktop/tablet rotates
  useEffect(() => {
    if (isMobile) return; // stop rotation

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 3 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="hero-slider">
      <div className="hero-slide-container">
        {/* MOBILE → only NimHero */}
        {isMobile && <NimHero />}

        {/* DESKTOP/TABLET → slider */}
        {!isMobile && (
          <>
            {activeSlide === 1 && <NimHero />}
            {activeSlide === 2 && <VerifiedHero />}
            {activeSlide === 3 && <GrowthBanner />}
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSlider;
