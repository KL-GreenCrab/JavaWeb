// src/components/UserList.js

import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';

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

    if (!userList.length) return <p>Loading...</p>;

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {userList.map(user => (
                    <li key={user.email}>
                        {user.username} - {user.email} - {user.roles}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
