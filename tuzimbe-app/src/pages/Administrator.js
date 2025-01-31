import React from 'react';
import Materials from './Materials';

const Administrator = () => {
    return (
        <main>
            <section id='admin'>
                <h1>Administrator</h1>
                <iframe 
                    src="http://localhost:8000/admin/" 
                    style={{ width: '100%', height: '600px', border: 'none' }}
                    title="Django Admin Panel"
                ></iframe>
            </section>
            <section id='materials'>
                <Materials data={{ jobtitle: 'Manager' }} />
            </section>
        </main>
    );
};

export default Administrator;
