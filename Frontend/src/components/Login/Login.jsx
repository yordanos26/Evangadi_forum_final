import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosBaseURL from "../../Utility/ApiConfig";
const Login = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please provide all required information");
      return;
    }
    try {
      // Add your backend URL here
      const response = await axiosBaseURL.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });
      alert("Login Successful");
      // console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      setSuccessMessage("Login Successful");
      // Redirect  based on successful login
      navigate("/");
    } catch (error) {
      // Handle error, show erroerror?.response?.data?.msgr message to the user
      console.error("Login failed:");
   
      setErrorMessage(error?.response?.data?.msg);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginContainer}>
      {/* Display error message */}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {/* Display success message */}
      {successMessage && (
        <p className={styles.success}>{successMessage}</p>
      )}{" "}
      <h2 className={styles.title}>Login to your account</h2>
      <p className={styles.subtitle}>
        Don’t have an account?{" "}
        <Link to="" onClick={onToggle} className={styles.createAccount}>
          Create a new account
        </Link>
      </p>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            className={styles.input}
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={styles.input}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className={styles.passwordToggleIcon}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "🙊" : "🙈"} {/* Eye icon to toggle */}
            </span>
          </div>
        </div>
        <div className={styles.forgotPassword}>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
