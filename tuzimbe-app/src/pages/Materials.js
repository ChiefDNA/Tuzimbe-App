import React, { useState, useEffect } from 'react';

const Materials = ({ data }) => {
    const [materials, setMaterials] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Status = data?.jobtitle || 'Guest';

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/materials/', {
                    method: 'POST',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({ jobtitle: Status }),
                });
                const data = await response.json();
                setMaterials(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        const fetchNewRecords = async () => {
            if (Status === 'Manager') {
                try {
                    const response = await fetch('http://localhost:8000/api/NewRecord/', {
                        method: 'GET',
                        headers: { 'Content-Type': "application/json" },
                    });
                    const data = await response.json();
                    setItems(data);
                } catch (err) {
                    setError(err.message);
                }
            }
        };

        fetchMaterials();
        fetchNewRecords();
    }, [Status]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section id="material">
            {Status === 'Manager' && (
                <>
                    <h1>Materials In Storage</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Material</th>
                                <th>Quantity Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.material}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            <h1>Material List Records</h1>
            <button onClick={() => window.location.reload()}>Refresh</button>
            <table>
                <thead>
                    <tr>
                        <th>Date Time</th>
                        <th>Material</th>
                        <th>Quantity Left</th>
                        <th>Quantity Bought</th>
                        <th>Quantity Used</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map(material => (
                        <tr key={material.id}>
                            <td>{material.datetime}</td>
                            <td>{material.material}</td>
                            <td>{material.quantity}</td>
                            <td>{material.bought}</td>
                            <td>{material.used}</td>
                            <td>{material.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Materials;
