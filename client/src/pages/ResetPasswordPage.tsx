import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/request-password-reset/send-request-link`, {
                email: email,
            });

            const data = response.data;
            alert(data.message);
        }
        catch (error) {
            console.error('Error sending email');
        }
        finally {
            setEmail('')
        }
    };

    return (
        <div className='resetPassword-container'>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )};

export default ResetPassword