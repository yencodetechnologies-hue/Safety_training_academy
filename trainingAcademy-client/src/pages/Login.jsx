import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Layout.css";
import "../styles/Login.css"

import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="register-container"
    >
      <div className="register-container">

        <p className="back-btn back-btn-login" onClick={()=>{navigate("/")}}>
          ← Back to Home
        </p>

        <div className="auth-wrapper">

          <AuthCard />

          <LoginForm />

        </div>

      </div>
    </motion.div>
  );
}

export default Login;