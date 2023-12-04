// src/components/LoginComponent.jsx

import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const LoginComponent = ({ onLogin }) => {
    const [username, setUsername] = useState('alice.johnson@example.com');
    const [password, setPassword] = useState('hashed_password');

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(username, password);
    };

    return (
        <div>
            <Typography variant="h6">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username(E-mail)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
};

export default LoginComponent;
