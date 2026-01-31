import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";


import "../Style/StudentForm.css";

function StudentForm() {
  /* ================= EVENT CONFIG ================= */
  const eventDateTime = new Date("2026-01-31T18:00:00+05:30").getTime();

  const eventTime = "06:00 PM";
  const whatsappGroupLink = "https://chat.whatsapp.com/K4yFIKHWXiBL0SgttTxd4d";

  /* ================= TIMER STATE ================= */
  const [timeLeft, setTimeLeft] = useState({});
  const [expired, setExpired] = useState(false);

  /* ================= UI STATE ================= */
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    whatsapp: "",
    city: "",
    role: "",
    education: "",
    college: "",
  });

  /* ================= TIMER LOGIC ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = eventDateTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        setExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDateTime]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expired) return;

    setLoading(true);

    emailjs
      .send(
        "service_gw0jupp",
        "template_v3figgf",
        { ...formData, time: eventTime },
        "7XoSKX87VlShLss7C"
      )
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          setShowModal(true);
          window.open(whatsappGroupLink, "_blank");

          setFormData({
            fullName: "",
            email: "",
            mobile: "",
            whatsapp: "",
            city: "",
            role: "",
            education: "",
            college: "",
          });
        }, 1200);
      })
      .catch(() => {
        setLoading(false);
        alert("Email sending failed");
      });
  };

  return (
    <div className="page-wrapper">
      <div className="layout">

        {/* COUNTDOWN */}
        <div className="countdown-box">
          <h3>Registration Ends In</h3>

          {!expired ? (
            <div className="timer">
              <div><span>{timeLeft.days}</span><p>Days</p></div>
              <div><span>{timeLeft.hours}</span><p>Hours</p></div>
              <div><span>{timeLeft.minutes}</span><p>Min</p></div>
              <div><span>{timeLeft.seconds}</span><p>Sec</p></div>
            </div>
          ) : (
            <p className="closed-text">Registration Closed</p>
          )}
        </div>

        {/* FORM */}
        <div className="form-container">
          <div className="event-box">
            <h2>Building Autonomous AI & Agent Systems</h2>
            <p>(From AI Fundamentals to Real-World Agent System
 – Live Demo)</p>
            <h4>📅 31/01/2026 | ⏰ {eventTime}</h4>
          </div>

          <form onSubmit={handleSubmit} className="horizontal-form">
            {[
              ["Full Name", "fullName"],
              ["Email", "email", "email"],
              ["Mobile Number", "mobile"],
              ["WhatsApp Number", "whatsapp"],
              ["City", "city"],
              ["Education Qualification", "education"],
              ["College Name", "college"],
            ].map(([label, name, type]) => (
              <div className="field" key={name}>
                <label>{label}</label>
                <input
                  type={type || "text"}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className="field">
              <label>Current Role</label>
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Staff">Staff</option>
              </select>
            </div>

            <button type="submit" disabled={loading || expired}>
              {expired ? "Registration Closed" : loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>🎉 Registration Successful</h3>
            <p>Redirecting to WhatsApp group</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentForm;
