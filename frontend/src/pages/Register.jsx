import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="mb-3">Create Account</h3>

        <form onSubmit={handleSubmit}>
          <input className="form-control my-2" placeholder="Name"
            onChange={(e) => setForm({...form, name: e.target.value})}/>

          <input className="form-control my-2" placeholder="Email"
            onChange={(e) => setForm({...form, email: e.target.value})}/>

          <input className="form-control my-2" type="password" placeholder="Password"
            onChange={(e) => setForm({...form, password: e.target.value})}/>

          <button className="btn btn-primary">Register</button>
        </form>

        <p className="mt-3">
          Already have an account?
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}