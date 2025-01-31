import React, { useEffect } from "react";
import Home from "./Home";
import axios from "axios";

const Logout = ({ data, onFetch }) => {
    useEffect(() => {
        onFetch();
        axios.post('http://localhost:8000/api/logout/', data)
            .then(response => alert(response.data))
            .catch(() => alert("You haven't logged into the system"));
    }, [data, onFetch]);

    return <Home />;
};

export default Logout;
