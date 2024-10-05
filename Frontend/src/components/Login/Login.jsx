import React, { useState } from 'react';
// import axios from 'axios';
import styles from './Login.module.css';


const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
const [errorMessage, setErrorMessage] = useState('');

  // Handler for form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    // const email=emailDom.current.value;
    // const passValue=passwordDom.current.value;

    // if (!emailValue || !passValue){
    //   alert('Please provide all required information');
    //   return;
    // }
    try {
      // Add your backend URL here
    const response = await axios.post('backend-url/api/login', {
        email,
        password,
    });

      // Handle successful authentication, e.g., storing token or redirecting
    console.log('Login successful:', response.data);
    // localStorage.setItem('token', data.token);
    // Redirect  based on successful login
    // navigate('/')
    } catch (error) {
      // Handle error, show error message to the user
    console.error('Login failed:', error.response?.data || error.message);
    setErrorMessage('Login failed. Please check your credentials and try again.');
    }
};

  // Toggle password visibility
const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

return (
    <div className={styles.loginContainer}>
    <h2 className={styles.title}>Login to your account</h2>
    <p className={styles.subtitle}>
        Don’t have an account? <a href="#" className={styles.createAccount}>Create a new account</a>
    </p>
    <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
        <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Updates email state
            required
            />
        </div>
        <div className={styles.inputGroup}>
        <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"} // Toggles between text and password
            id="password"
            className={styles.input}
            placeholder="Password"
            value={password}
              onChange={(e) => setPassword(e.target.value)} // Updates password state
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
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} {/* Display error message */}
        <div className={styles.forgotPassword}>
        <a href="#">Forgot password?</a>
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
    </form>
    </div>
);
};

export default Login;
