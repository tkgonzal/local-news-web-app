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
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="accType">Account Type:</label>
                    <select
                        name="accType"
                        value={formData.accType}
                        onChange={handleAccTypeChange}
                    >
                        <option value={'user'}>User</option>
                        <option value={'business'}>Business</option>
                    </select>
                </div>
                {formData.accType === 'business' && (
                    <div>
                        <label htmlFor="businessName">Business Name:</label>
                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                )}
                { formData.accType === 'business' && (
                    <div>
                        <label htmlFor="businessWebsite">Business Website:</label>
                        <input
                            type="text"
                            name="businessWebsite"
                            value={formData.businessWebsite}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                )}
                {formData.accType === 'business' && (
                    <div>
                        <label htmlFor="mobileNumber">Mobile Phone Number:</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                )}
                <button type="submit">Register</button>
            </form>
        </div>
    )};

export default RegisterPage;