import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [tellNo, setTellNo] = useState('');
    const [password, setPassword] = useState('');
    const [choice, setChoice] = useState('email');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginData = {
            password,
            choice
        };
        if (choice === 'email') {
            loginData.email = email;
        } else {
            loginData.tellNo = tellNo;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/login/', loginData);
            console.log(response.data);
            sessionStorage.setItem('LoggedIn', JSON.stringify(response.data));
            sessionStorage.setItem('expiresAt', Date.now() + 3600000);
            onSuccess();
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div>
            <h3>Login</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="radio" name="choice" value="email" checked={choice === 'email'} onChange={(e) => setChoice(e.target.value)} />
                    Login with Email
                </label>
                {choice === 'email' && (
                    <>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </>
                )}

                <label>
                    <input type="radio" name="choice" value="tellNo" checked={choice === 'tellNo'} onChange={(e) => setChoice(e.target.value)} />
                    Login with Phone Number
                </label>
                {choice === 'tellNo' && (
                    <>
                        <label>Phone Number:</label>
                        <input type="text" value={tellNo} onChange={(e) => setTellNo(e.target.value)} />
                    </>
                )}

                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
