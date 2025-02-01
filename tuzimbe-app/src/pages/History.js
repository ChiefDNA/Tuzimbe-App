import React, { useState, useEffect } from 'react';

function History({ data }) {
    const [userData, setUserData] = useState([]);
    const [userInformation, setUserInformation] = useState({});
    const [numb, setNumb] = useState('');
    const [activeUser, setActiveUser] = useState(null);

    // Load active user ONCE when the component mounts
    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('LoggedIn'));
        setActiveUser(loggedInUser);
        setNumb(loggedInUser?.tellNo || '');
    }, []);

    // Fetch user info when `numb` changes
    useEffect(() => {
        if (!numb) return;

        fetch('http://localhost:8000/api/Myinfo/', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ tellNo: numb }),
        })
        .then(response => response.json())
        .then(data => setUserInformation(data))
        .catch(error => console.error("Error fetching user info:", error));
    }, [numb]);

    // Fetch user history when `numb` changes
    useEffect(() => {
        if (!numb) return;

        fetch('http://localhost:8000/api/Mydata/', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ tellNo: numb }),
        })
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error("Error fetching user data:", error));
    }, [numb]);

    return (
        <>
            <section id="section1">
                {(activeUser?.username === userInformation.username || data?.jobtitle === 'Manager') ? (
                    <ul>
                        <span>{userInformation.firstname} {userInformation.sirname}</span>
                        <li>Phone No: {userInformation.tellNo}</li>
                        <li>Job: {userInformation.jobtitle}</li>
                        <li>Email: {userInformation.email}</li>
                        <li>Address: {userInformation.address}</li>
                    </ul>
                ) : (
                    <p>........UNAUTHORIZED.......</p>
                )}
            </section>

            <section id="section2">
                {activeUser?.jobtitle === 'Manager' && (
                    <input
                        value={numb}
                        placeholder="Enter phone number to lookup"
                        onChange={(e) => setNumb(e.target.value)}
                    />
                )}
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Arrival</th>
                            <th>Departure</th>
                            <th>Tracker</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(dates => (
                            <tr key={dates.date}>
                                <td>{dates.date}</td>
                                <td>{dates.arrival}</td>
                                <td>{dates.departure}</td>
                                <td>{dates.recorder}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default History;
