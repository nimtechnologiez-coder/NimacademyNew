import React, { useRef, useEffect, useState } from "react";
import "../Programcss/LearningModel.css";

const LearningModel = () => {
  const titleRef = useRef(null);
  const circleRef = useRef(null);
  const cardRefs = useRef([]);
  const enrollRef = useRef(null);

  const [animate, setAnimate] = useState({
    title: false,
    circle: false,
    cards: [],
    enroll: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const anim = entry.target.dataset.anim;

            if (anim === "card") {
              setAnimate((prev) => ({
                ...prev,
                cards: [...prev.cards, entry.target.dataset.index],
              }));
            } else {
              setAnimate((prev) => ({ ...prev, [anim]: true }));
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    // Observe Elements
    if (titleRef.current) {
      titleRef.current.dataset.anim = "title";
      observer.observe(titleRef.current);
    }
    if (circleRef.current) {
      circleRef.current.dataset.anim = "circle";
      observer.observe(circleRef.current);
    }
    if (enrollRef.current) {
      enrollRef.current.dataset.anim = "enroll";
      observer.observe(enrollRef.current);
    }

    cardRefs.current.forEach((el, index) => {
      if (el) {
        el.dataset.anim = "card";
        el.dataset.index = index;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: "Live 2-Hour Sessions Daily",
      desc: "Interactive classes guided by industry experts, where you'll explore real-world tools and problem-solving techniques.",
    },
    {
      title: "Daily 3-Hour Practice",
      desc: "Every concept you learn is immediately applied through structured tasks, ensuring 100% skill retention and confidence building.",
    },
    {
      title: "10 Mini Projects + 1 Major",
      desc: "Work on practical projects from real industry scenarios—strengthening your portfolio and boosting employability.",
    },
    {
      title: "Mentorship & Tracking",
      desc: "Our mentors guide you at every step, reviewing your work, providing feedback, and preparing you for the industry with confidence.",
    },
    {
      title: "Certificate + Internship",
      desc: "Upon completion, earn a recognized certificate and become eligible for internship and placement opportunities through NIM Academy’s network.",
    },
  ];

  return (
    <div className="learning-wrapper">
      {/* BACKGROUND CIRCLES */}
      <div className="bg-circle circle-a"></div>
      <div className="bg-circle circle-b"></div>
      <div className="bg-circle circle-c"></div>
      <div className="bg-circle circle-d"></div>
      <div className="bg-circle circle-e"></div>

      {/* TITLE */}
      <div
        ref={titleRef}
        className={`title-container fade-up ${animate.title ? "show" : ""}`}
      >
        <div className="learning-title">Step-by-Step Learning Model</div>
      </div>

      <div className="main-layout">
        {/* LEFT BIG CIRCLE */}
        <div
          ref={circleRef}
          className={`circle-left fade-up ${animate.circle ? "show" : ""}`}
        >
          <div className="circle-box">
            Learning <br /> Model
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="cards-area">
          {steps.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`card-box card${index + 1} fade-up ${
                animate.cards.includes(String(index)) ? "show" : ""
              }`}
            >
              <div className="num-circle">{index + 1}</div>
              <div>
                <div className="card-title">{item.title}</div>
                <div className="card-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ENROLL BUTTON */}
      <div
        ref={enrollRef}
        className={`fade-up ${animate.enroll ? "show" : ""}`}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "60px",
        }}
      >
        

  {/* Ribbon Box */}
      <div className="ribbonsl-wrapper">
        <div className="ribbonsl">
          <p>Enroll & Begin Your Journey</p>
        </div>
        <div className="ribbonsl-shadow"></div>
      </div>




      </div>
    </div>
  );
};

export default LearningModel;
