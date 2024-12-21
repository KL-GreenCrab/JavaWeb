import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import {
    Container,
    Card,
    CardContent,
    CardHeader,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';

const AdminProfile = () => {
    const [adminInfo, setAdminInfo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Unauthorized');

                const response = await userService.getAdminProfile(token);
                setAdminInfo(response);
            } catch (err) {
                setError('Error fetching admin profile');
            }
        };

        fetchAdminProfile();
    }, []);

    if (error) {
        return (
            <Container maxWidth="sm" style={{ marginTop: '20px' }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!adminInfo) {
        return (
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20px' }}>
                <CircularProgress />
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                    Loading Admin Profile...
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '30px' }}>
            <Card>
                <CardHeader
                    title="Admin Profile"
                    subheader="Details of the Admin Account"
                    style={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}
                />
                <CardContent>
                    <Typography variant="h6" color="textSecondary">
                        Username: {adminInfo.name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Email: {adminInfo.email}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Role: {adminInfo.roles}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AdminProfile;
