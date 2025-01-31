import React, { useState, useEffect } from 'react';
import { NavLink as Link } from 'react-router-dom';

const Sidebar = () => {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [activeUser, setActiveUser] = useState(null);
    const [jobtitle, setJobtitle] = useState('null');

    // Load session storage data only once when the component mounts
    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('LoggedIn'));
        setActiveUser(loggedInUser);
        setJobtitle(loggedInUser ? loggedInUser.jobtitle : 'null');
        setIsLogedIn(!!loggedInUser);
    }, []);

    Sidebar.handleLogOut = () => {
        setActiveUser(null);
        sessionStorage.removeItem('LoggedIn');
        sessionStorage.removeItem('expiresAt');
        setIsLogedIn(false);
    };

    Sidebar.activeUser = activeUser;

    return (
        <div className="sidebar">
            <ul>
                <li className="idhom"><Link to="/">Home</Link></li>
                {!isLogedIn && <li className="idlin"><Link to="/Login">Login</Link></li>}
                {(jobtitle === 'Manager' || jobtitle === 'Tracker') && <li className="idmat"><Link to="/Materials">Material</Link></li>}
                {(jobtitle === 'Manager' || jobtitle === 'Tracker') && <li className="idnew"><Link to="/NewRecord">New Records</Link></li>}
                {jobtitle === 'Manager' && <li className="idadm"><Link to="/Administrator">Administrator</Link></li>}
                {(jobtitle === 'Manager' || jobtitle === 'Tracker') && <li className="idatt"><Link to="/Attendence">Attendence</Link></li>}
                {jobtitle === 'Manager' && <li className="idemp"><Link to="/Employees">Employees</Link></li>}
                {isLogedIn && <li className="idhis"><Link to="/History">History</Link></li>}
                <li className="idreg"><Link to="/Register">Register</Link></li>
                {isLogedIn && <li className="idout"><Link to="/Logout">Logout</Link></li>}
            </ul>
        </div>
    );
};

export default Sidebar;
