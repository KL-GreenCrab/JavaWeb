import React, { useState } from 'react';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Thay thế useHistory bằng useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await userService.registerUser({ name, email, password });
            setMessage(response);
            navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            setError(err.response ? err.response.data : 'Registration failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '30px' }}>
                <Typography variant="h5" align="center">Register</Typography>
                {message && <Typography color="success" align="center">{message}</Typography>}
                {error && <Typography color="error" align="center">{error}</Typography>}
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent="center" style={{ marginTop: '10px' }}>
                        <Grid item>
                            <Button
                                onClick={() => navigate('/login')}
                                variant="text"
                            >
                                Already have an account? Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterForm;
