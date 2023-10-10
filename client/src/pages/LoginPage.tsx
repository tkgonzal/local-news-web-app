import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: email,
                password: password
            });

            const { accessToken, userWithoutPassword } = response.data;
            Cookies.set('access_token', accessToken);
            console.log('Access Token: ', accessToken, 'user: ', userWithoutPassword)
        }
        catch (error) {
            console.error('Error', error);
        }
        finally {
            setEmail('');
            setPassword('');
        }
    }


return (
    <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
            <div className='form-group'>
                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type='submit'>Login</button>
        </form>
        <a href=''>Forgot Password?</a>
        <div>
            <button>Register</button>
        </div>
        
    </div>
)};

export default Login