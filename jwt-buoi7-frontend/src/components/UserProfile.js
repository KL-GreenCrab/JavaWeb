import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { Container, Typography, CircularProgress, Card, CardContent, CardActions, Button } from '@mui/material';

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Unauthorized');

                const userData = await userService.getUserProfile(token);
                setUserInfo(userData);
            } catch (err) {
                setError('Error fetching user profile');
            }
        };

        fetchUserProfile();
    }, []);

    if (!userInfo) {
        return (
            <Container>
                <CircularProgress /> {/* Hiển thị loading spinner */}
            </Container>
        );
    }

    // Xử lý hiển thị roles nếu roles không phải mảng
    const rolesDisplay = Array.isArray(userInfo.roles) ? userInfo.roles.join(', ') : 'N/A';

    return (
        <Container maxWidth="md" style={{ marginTop: '30px' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        User Profile
                    </Typography>
                    <Typography variant="subtitle1">Username: {userInfo.name}</Typography>
                    <Typography variant="subtitle1">Email: {userInfo.email}</Typography>
                    <Typography variant="subtitle1">Roles: {userInfo.roles}</Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => window.location.href = '/home'} 
                    >
                        Back to Home
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default UserProfile;
