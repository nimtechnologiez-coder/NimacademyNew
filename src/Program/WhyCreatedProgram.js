import React, { useRef, useEffect, useState } from "react";
import "../Programcss/WhyCreatedProgram.css";

const WhyCreatedProgram = () => {
  const headingRef = useRef(null);
  const textRef = useRef(null);

  const [animate, setAnimate] = useState({
    heading: false,
    text: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.dataset.anim) {
            setAnimate((prev) => ({
              ...prev,
              [entry.target.dataset.anim]: true,
            }));
          }
        });
      },
      { threshold: 0.25 }
    );

    if (headingRef.current) {
      headingRef.current.dataset.anim = "heading";
      observer.observe(headingRef.current);
    }

    if (textRef.current) {
      textRef.current.dataset.anim = "text";
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="why-wrapper">
      {/* HEADING */}
      <h2
        ref={headingRef}
        className={`why-heading fade-up ${animate.heading ? "show" : ""}`}
      >
        Why We Created This Program
      </h2>

      <div className="why-content">
        {/* LEFT TEXT */}
        <div
          ref={textRef}
          className={`why-text fade-up ${animate.text ? "show" : ""}`}
        >
          <p>
            We saw how students spend months learning — and still feel unprepared
            for real work. That’s why NIM Academy created a power-packed,
            outcome-based learning model — where students learn, build, and
            showcase their skills in just 17 days. Each program blends theory,
            tools, and projects that mirror real industry environments —
            helping you stand out faster and smarter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyCreatedProgram;
