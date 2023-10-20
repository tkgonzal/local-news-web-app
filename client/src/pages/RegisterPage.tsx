import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

import { isStrongPassword } from '../utils/passwordUtils';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        accType: 'user',
        businessName: '',
        businessWebsite: '',
        mobileNumber: '',
    });

    // Uncomment useEffect When business panel page gets added. 

    // useEffect(() => {
    //     if (user?.accType === 'business') {
    //         navigate('/business-panel');  *** just change the '/business-panel' to the correct route
    //     }
    //     else {
    //         navigate('/')
    //     }
    // }, [user])

    const { setUser } = useUserContext();

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAccTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        try {
            if (formData.password === formData.confirmPassword && isStrongPassword(formData.password)) {
                const userData = {
                    email: formData.email,
                    password: formData.password,
                    accType: formData.accType,
                    businessName: formData.businessName,
                    businessWebsite: formData.businessWebsite,
                    mobileNumber: formData.mobileNumber,
                };

                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/users/register`, {
                userData
                });

                const { userWithoutPassword, accessToken } = response.data;

                Cookies.set('access_token', accessToken);
                setUser(userWithoutPassword);
            }
            else {
                alert('Passwords do not match');
            }  
        }
        catch (error: any) {
            console.error('Error registering user.', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(`${error.response.data.message}.`);
            }
            
        }
        finally {
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                accType: '',
                businessName: '',
                businessWebsite: '',
                mobileNumber: '',
            });
            // remove below when business panel page gets pushed and uncomment useEffect
            navigate('/');
            // remove above when business panel page gets pushed and uncomment useEffect
        }

    }

    return (
        <div className="main-container">
            <div className='header'>
                <h4 className='home-link' onClick={() => navigate("/")}>Home</h4>
            </div>
            <div className="container">
                <div className="register-container">
                    <h1 className='title' >Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                className='input'
                                autoComplete='off'
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                            <label className='user-label'>Email</label>
                        </div>
                        <div className="input-group">
                            <input
                                className='input'
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required 
                            />
                            <label className='user-label'>Password:</label>
                        </div>
                        <div className="input-group">
                            <input
                                className='input'
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required 
                            />
                            <label className='user-label'>Confirm Password:</label>
                        </div>
                        <div className="input-group">
                            <select
                                className='input'
                                name="accType"
                                value={formData.accType}
                                onChange={handleAccTypeChange}
                            >
                                <option value={'user'}>User</option>
                                <option value={'business'}>Business</option>
                            </select>
                            <label className='user-label-transparent'>Account Type</label>
                        </div>
                        {formData.accType === 'business' && (
                            <div className="input-group">
                                <input
                                    className='input'
                                    autoComplete='off'
                                    type="text"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    required 
                                />
                                <label className='user-label'>Business Name:</label>
                            </div>
                        )}
                        { formData.accType === 'business' && (
                            <div className="input-group">
                                <input
                                    className='input'
                                    autoComplete='off'
                                    type="text"
                                    name="businessWebsite"
                                    value={formData.businessWebsite}
                                    onChange={handleChange}
                                    required 
                                />
                                <label className='user-label'>Business Website:</label>
                            </div>
                        )}
                        {formData.accType === 'business' && (
                            <div className="input-group">
                                <input
                                    className='input'
                                    autoComplete='off'
                                    type="text"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    required 
                                />
                                <label className='user-label'>Mobile Phone Number:</label>
                            </div>
                        )}
                        <button type="submit" className="login-btn btn">Create Account</button>
                    </form>
                    <div className='footer'>
                        <p className='footer-links'><strong>PRIVACY POLICY</strong></p>
                        <p><strong>{String.fromCharCode(8226)}</strong></p>
                        <p className='footer-links'><strong>TERMS & CONDITIONS</strong></p>
                    </div>
                </div>
                <div className='welcome-container'>
                    <div className='right-container'>
                        <div className='logo'>
                            <h1>LOGO</h1>
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

export default RegisterPage;