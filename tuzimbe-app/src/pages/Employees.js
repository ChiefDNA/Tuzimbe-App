import React, { useState, useEffect } from 'react';

const Employees = ({ data }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const status = data?.jobtitle || 'Guest';

    useEffect(() => {
        fetch('http://localhost:8000/api/employees/', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ jobtitle: status }),
        })
        .then(response => response.json())
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [status]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Employee List</h1>
            <button onClick={() => window.location.reload()} style={{ marginLeft: 10 }}>
                Refresh
            </button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
