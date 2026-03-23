import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Layout.css";
import "../styles/Login.css";
import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="register-container"
    >
      <div className="register-container">
        <p
          className="back-btn back-btn-login"
          onClick={() => { navigate("/"); }}
        >
          ← Back to Home
        </p>

        <div className="auth-wrapper">
          {/* Hidden on mobile via CSS */}
          <div className="auth-card-wrapper">
            <AuthCard />
          </div>

          <LoginForm />
        </div>
      </div>
    </motion.div>
  );
}

export default Login;