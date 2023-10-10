import React, { useState } from 'react';
import axios from 'axios';
import { isStrongPassword } from '../utils/passwordUtils';

const ConfirmResetPassword: React.FC = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

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
                console.log(isStrongPassword(formData.password), formData.password)
                // axios stuff here
            }
            else {
                alert('Passwords do not match');
            }

        }
        catch (error) {

        }
        finally {

        }
        
    }

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
    )

}

export default ConfirmResetPassword