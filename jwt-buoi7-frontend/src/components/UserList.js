// src/components/UserList.js

import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Unauthorized');

                const users = await userService.getAllUserDetails(token);
                setUserList(users);
            } catch (err) {
                setError('Error fetching user list');
            }
        };

        fetchUserList();
    }, []);

    if (!userList.length) return <p>Access denied</p>;

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                User List
            </Typography>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Username</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Roles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map(user => (
                            <TableRow key={user.email}>
                                <TableCell align="center">{user.username}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.roles}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserList;
