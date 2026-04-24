import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      register(formData.name, formData.email, formData.password);
      navigate("/jobs");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="page auth-page">
      <section className="section-card auth-card">
        <p className="section-tag">Register</p>
        <h1>Create a new account</h1>
        <p className="section-note">
          Registered users can login, browse jobs, and apply.
        </p>

        <form onSubmit={handleSubmit} className="simple-form">
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </label>

          <button className="primary-button" type="submit">
            Register
          </button>
        </form>

        {message ? <p className="message-box message-box--error">{message}</p> : null}

        <p className="auth-card__footer">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
