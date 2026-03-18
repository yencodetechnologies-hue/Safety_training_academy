import React from "react";
import { Link } from "react-router-dom";
import "../styles/Layout.css";
import "../styles/Login.css"

import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";

function Login() {
  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="register-container"
    >
      <div className="register-container">

        <a href="/" className="back-btn">
          ← Back to Home
        </a>

        <div className="auth-wrapper">

          <AuthCard />

          <LoginForm />

        </div>

      </div>
    </motion.div>
  );
}

export default Login;