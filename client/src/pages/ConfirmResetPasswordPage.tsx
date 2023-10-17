import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { isStrongPassword } from '../utils/passwordUtils';

const ConfirmResetPassword: React.FC = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            if (formData.password === formData.confirmPassword && isStrongPassword(formData.password)) {
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/api/confirm-password-reset/reset`, 
                    {
                        newPassword: formData.password,
                    },
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                
                const data = response.data;
                alert(data.message);
            }
            else {
                alert('Passwords do not match');
            }
            navigate('/login');

        }
        catch (error) {
            console.error('Error resetting password: ', error);
        }
        finally {
            setFormData({
                password: '',
                confirmPassword: '',
            });
        }  
    };

    return (
        <div className='confirmResetPassword-container'>
            <h1>Confirm Password Reset</h1>
            <form onSubmit={handleSubmit}>
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
                <button type='submit'>Submit</button>
            </form>
        </div>
    )};

export default ConfirmResetPassword