import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../contexts/UserContext';

import Cookies from 'js-cookie';
import axios from 'axios';

import moNewsLogoImg from "/assets/mo_news_logo_white.png"

import './signin.css'

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (user && user?.accType === 'Business') {
            navigate('/business/articles');
        }
        else if (user) {
            navigate('/')
        }
    }, [user])
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
                email: email,
                password: password
            });

            const { accessToken, userWithoutPassword } = response.data;
            Cookies.set('access_token', accessToken);
            setErrorMessage("");
            setUser(userWithoutPassword);
        }
        catch (error: any) {
            if (error.response && 
                error.response.data && 
                error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage(error.message);
            }
        }
        finally {
            setEmail('');
            setPassword(''); 
        }
    }


return (
    <div className='main-container'>
        {/* <div className='header'>
            <h4 className='home-link' onClick={() => navigate("/")}>Home</h4>
        </div> */}
        <div className='container'>
            <h4 className='home-link' onClick={() => navigate("/")}>Home</h4>
            <div className='login-container'>
                <h1 className='title'>Sign In</h1>
                <form onSubmit={handleLogin} className='form-Group'>
                    <div className='input-group'>
                        <input
                            className='input'
                            type='email'
                            autoComplete='off'
                            id='email'
                            name='email'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className='user-label'>Email</label>
                    </div>
                    <div className='input-group'>
                        <input
                            className='input'
                            type='password'
                            id='password'
                            name='password'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label className='user-label'>Password</label>
                    </div>
                    <span className="error-message">{errorMessage}</span>
                    <div className='forgot-password'>
                        <div className='remember'>
                            <input type="checkbox" name="remember-me" id="remember-me" />
                            <p>Remember me</p>
                        </div>
                        <a href='' onClick={() => navigate("/reset-password")}>Forgot Password?</a>
                    </div>
                    <button type='submit' className='login-btn btn'>Sign In</button>
                </form>
                <div>
                    <p>Don't have an account? <a href='' onClick={() => navigate("/register")}>Create one</a></p>
                </div>
                <div className='footer'>
                    <p className='footer-links'><strong>PRIVACY POLICY</strong></p>
                    <p><strong>{String.fromCharCode(8226)}</strong></p>
                    <p className='footer-links'><strong>TERMS & CONDITIONS</strong></p>
                </div>
            </div>
            <div className='welcome-container'>
                <div className='right-container'>
                    <div className='logo'>
                        <img 
                            src={moNewsLogoImg}
                            onClick={() => navigate("/")}
                            alt="MoNews Logo in White" 
                        />
                    </div>
                    <div className='welcome'>
                        <h1>WELCOME</h1>
                    </div>
                    <div className='cta'>
                        <h4>Sign up today and discover the latest articles locally.</h4>
                    </div>
                    <div className='inverse-button'>
                        <button className='btn-inverse login-btn' onClick={() => navigate("/register")}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)};

export default LoginPage