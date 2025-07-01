// SignupPage.jsx - Example of proper implementation
import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.css';
import { Link } from 'react-router-dom'

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Log the request payload for debugging
      console.log('Submitting form data:', formData);
      
      const response = await axios.post('http://localhost:8001/api/auth/signup', formData);
      console.log('Signup successful:', response.data);
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Signup error:', err.response?.data);
      
      // Handle validation errors from the server
      if (err.response?.data?.errors) {
        // Format and display validation errors
        const errorMessages = err.response.data.errors.map(error => error.msg).join(', ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'An error occurred during signup');
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className='signup-form'>
        <h2>Sign Up</h2>
      
        {success && (
          <div className="success-message">
            Account created successfully! You can now log in.
          </div>
        )}
      
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength="3"
        />
        
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="8"
        />
        <small>Password must be at least 8 characters long</small>
      
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        
        <button type="submit" className="signup-button">
          Create Account
        </button>
        <p className="form-link">Already have an account? <Link to="/api/auth/login">Login</Link></p>
      </form> 
    </div>
  );
};

export default SignupPage;