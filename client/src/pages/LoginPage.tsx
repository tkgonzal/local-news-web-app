import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../contexts/UserContext';

import Cookies from 'js-cookie';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, setUser } = useUserContext();

    const navigate = useNavigate();

    // Uncomment useEffect When business panel page gets added. 

    // useEffect(() => {
    //     if (user?.accType === 'business') {
    //         navigate('/business-panel');  *** just change the '/business-panel' to the correct route
    //     }
    //     else {
    //         navigate('/')
    //     }
    // }, [user])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
                email: email,
                password: password
            });

            const { accessToken, userWithoutPassword } = response.data;
            Cookies.set('access_token', accessToken);
            setUser(userWithoutPassword);
        }
        catch (error) {
            console.error('Error', error);
        }
        finally {
            setEmail('');
            setPassword('');
            // remove below when business panel page gets pushed and uncomment useEffect
            navigate('/');
            // remove above when business panel page gets pushed and uncomment useEffect
            
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
        <a href='' onClick={() => navigate("/reset-password")}>Forgot Password?</a>
        <div>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
        
    </div>
)};

export default LoginPage