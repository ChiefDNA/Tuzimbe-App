import React, { useState } from 'react';
import axios from 'axios';
import Administrator from './Administrator';

const Login = ({ onSuccess }) => {
    const [username, setUsername] = useState('');
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
        if (choice === 'username') {
            loginData.username = username;
        } else {
            loginData.tellNo = tellNo;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/login/', loginData);
            console.log(response.data);
            sessionStorage.setItem('LoggedIn', JSON.stringify(response.data.user));
            sessionStorage.setItem('expiresAt', Date.now() + 3600000);
            onSuccess();
            return <Administrator />
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <section id="login">
            <h3>Login</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="radio" name="choice" value="username" checked={choice === 'username'} onChange={(e) => setChoice(e.target.value)} />
                    Login with UserName
                </label>
                {choice === 'username' && (
                    <>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
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
        </section>
    );
};

export default Login;
