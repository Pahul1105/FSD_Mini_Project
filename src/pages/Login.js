import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
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
      const user = login(formData.email, formData.password);
      const nextPage =
        location.state?.from || (user.role === "admin" ? "/admin" : "/jobs");
      navigate(nextPage);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="page auth-page">
      <section className="section-card auth-card">
        <p className="section-tag">Login</p>
        <h1>Access your job portal account</h1>
        <p className="section-note">
          Login to apply for jobs or manage openings as admin.
        </p>

        <form onSubmit={handleSubmit} className="simple-form">
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
              placeholder="Enter your password"
              required
            />
          </label>

          <button className="primary-button" type="submit">
            Login
          </button>
        </form>

        {message ? <p className="message-box message-box--error">{message}</p> : null}

        <p className="auth-card__footer">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
