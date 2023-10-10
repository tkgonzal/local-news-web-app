import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(email);
        try {
            // axios stuff here
        }
        catch (error) {

        }
        finally {

        }
    }

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
    )
}

export default ResetPassword