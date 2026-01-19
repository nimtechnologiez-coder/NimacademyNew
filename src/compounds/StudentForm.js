import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../Style/StudentForm.css";

function StudentForm() {

  const eventTime = "06:00 AM - 07:30 PM";
  const whatsappGroupLink = "https://chat.whatsapp.com/KGkihPGklz06HPXyQUGEZJ";

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    whatsapp: "",
    city: "",
    role: "",
    education: "",
    college: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const finalData = {
      ...formData,
      time: eventTime
    };

    emailjs.send(
      "service_wxyr9d8",
      "template_se4uupk",
      finalData,
      "uxCZ6WGvKJaBi87p0"
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
          college: ""
        });

      }, 2000);
    })
    .catch(() => {
      setLoading(false);
      alert("Email sending failed!");
    });
  };

  return (
    <div className="form-container">

      <div className="event-box">
        <h2>Building Autonomous AI Agents Using LLMs</h2>
        <p>(From Prompting to Self-Directed Intelligence - Live Demo)</p>
        <h4>📅 24/01/2026 | ⏰ {eventTime}</h4>
      </div>

      <form onSubmit={handleSubmit} className="horizontal-form">

        <div className="field">
          <label>Full Name</label>
          <input name="fullName"
            value={formData.fullName}
            onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Email</label>
          <input type="email" name="email"
            value={formData.email}
            onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Mobile Number</label>
          <input name="mobile"
            value={formData.mobile}
            onChange={handleChange} required />
        </div>

        <div className="field">
          <label>WhatsApp Number</label>
          <input name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange} required />
        </div>

        <div className="field">
          <label>City</label>
          <input name="city"
            value={formData.city}
            onChange={handleChange} required />
        </div>

        {/* 🔽 DROPDOWN ADDED HERE */}
        <div className="field">
          <label>Current Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Working Professional">Working Professional</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <div className="field">
          <label>Education Qualification</label>
          <input name="education"
            value={formData.education}
            onChange={handleChange} required />
        </div>

        <div className="field">
          <label>College Name</label>
          <input name="college"
            value={formData.college}
            onChange={handleChange} required />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* LOADER */}
      {loading && (
        <div className="modal-overlay">
          <div className="loader"></div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>🎉 Registration Successful!</h3>
            <p>Redirecting to WhatsApp group...</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentForm;
