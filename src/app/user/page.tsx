"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    user_points: number;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>User Points</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>User Points</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.user_points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
