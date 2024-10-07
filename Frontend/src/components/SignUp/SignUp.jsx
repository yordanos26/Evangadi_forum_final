import React, { useState } from "react";
import classes from "./SignUp.module.css";
import {Link}  from 'react-router-dom'
const Signup = ({onToggle}) => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API integration call here
  };

  return (
    <div className={classes.signup_container}>
      <h2>Join the network</h2>
      <p>
        Already have an account? <Link to="" onClick={onToggle} >Sign in</Link>
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
        <Link to=""  onClick={onToggle} >Already have an account? </Link>
      </p>
    </div>
  );
};

export default Signup;
