import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = ({ data }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editedField, setEditedField] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const status = data?.jobtitle || 'Guest';

    useEffect(() => {
        fetch(`http://localhost:8000/api/attendance/${status}`, {
            method: 'GET',
            headers: { 'Content-Type': "application/json" },
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

    const handleSubmit = async (tellNo, index) => {
        setSubmitting(true);
        try {
            const response = await axios.post(`http://localhost:8000/api/attendance/${tellNo}`, editedField[index]);
            setUsers(response.data);
            setEditedField({});
        } catch (error) {
            console.error("Error submitting attendance:", error);
        } finally {
            setSubmitting(false);
        }
    };

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
                        <th>Date</th>
                        <th>Day ID</th>
                        <th>Username</th>
                        <th>Phone Number</th>
                        <th>Arrival</th>
                        <th>Departure</th>
                        <th>Submit</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.tellNo}>
                            <td>{user.date}</td>
                            <td>{user.dayid}</td>
                            <td>{user.username}</td>
                            <td>{user.tellNo}</td>
                            <td>
                                <input 
                                    type="time" 
                                    value={editedField[index]?.arrival || user.arrival} 
                                    onChange={(e) => setEditedField(prev => ({
                                        ...prev, [index]: { ...prev[index], arrival: e.target.value }
                                    }))}
                                />
                            </td>
                            <td>
                                <input 
                                    type="time" 
                                    value={editedField[index]?.departure || user.departure} 
                                    onChange={(e) => setEditedField(prev => ({
                                        ...prev, [index]: { ...prev[index], departure: e.target.value }
                                    }))}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleSubmit(user.tellNo, index)} disabled={submitting}>
                                    Submit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Attendance;
