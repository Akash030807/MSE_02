import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="mb-3">Welcome Back</h3>

        <form onSubmit={handleSubmit}>
          <input className="form-control my-2" placeholder="Email"
            onChange={(e) => setForm({...form, email: e.target.value})}/>

          <input className="form-control my-2" type="password" placeholder="Password"
            onChange={(e) => setForm({...form, password: e.target.value})}/>

          <button className="btn btn-success">Login</button>
        </form>

        <p className="mt-3">
          Don't have an account?
          <span className="auth-link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}