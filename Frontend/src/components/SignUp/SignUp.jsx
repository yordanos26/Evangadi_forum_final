import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axiosBaseURL from "../../Utility/ApiConfig";
const Signup = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null); // for error message
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosBaseURL.post(
        "/users/register",
        {
          // Sending user registration data
          username: formData.username,
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.status === 200) {
        setSuccess("You registered successfully!"); // Handle success response
        setError(null); // clear any previous errors
        navigate("/login");
      } else {
        setError(response.data.msg || "Registration failed."); // Handle error response
        setSuccess(null); // clear any previous success message
      }
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Error submitting the form. Please try again."
      ); // Enhanced error handling
      setSuccess(null); // clear any previous success message
    }
  };

  return (
    <div className={classes.signup_container}>
      <div className={classes.Error_container}>
        {/* Display error message */}
        {error && <p className={classes.error}>{error}</p>}
        {/* Display success message */}
        {success && <p className={classes.success}>{success}</p>}{" "}
      </div>
      <h2>Join the network</h2>
      <p>
        Already have an account?{" "}
        <Link to="/login" onClick={onToggle}>
          Sign in
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <div className={classes.name_fields}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <p>
          I agree to the <a href="/privacy-policy">privacy policy</a> and{" "}
          <Link to="/terms">terms of service</Link>.
        </p>
        <button type="submit">Agree and Join</button>
      </form>
      <p>
        <Link to="/login" onClick={onToggle}>
          Already have an account?{" "}
        </Link>
      </p>
    </div>
  );
};

export default Signup;
