import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:8001/api/auth/login', formData, {
                withCredentials: true
            });
            
            const token = res.data.token;
            if (token) {
                localStorage.setItem('token', token);

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                toast.success(res.data.message || 'Login Successful');
                navigate('/dashboard');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className = "login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
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
                <button type="submit">Login</button>
                <p className="form-link">Don't have an account? <Link to="api/auth/signup">Sign up</Link></p>
            </form>
        </div>
    )
};

export default LoginPage;