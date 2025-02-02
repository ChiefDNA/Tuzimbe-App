import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
    {
        title: "Project Overview",
        route: "Made mith React and Django",
        description: "Tuzimbe is a construction site app for people to keep track of workers and building material.",
    },
    {
        title: "PAGES",
        route: "Home",
        description: "The main dashboard giving an overview of all activities happening on the site.",
    },
    {
        title: "PAGES",
        route: "Login",
        description: "Allows users to log into their accounts for access to site management features.",
    },
    {
        title: "PAGES",
        route: "Register",
        description: "New users can sign up and create an account to start managing construction records.",
    },
    {
        title: "PAGES",
        route: "Materials",
        description: "Displays the list of materials available, including their quantities and usage.",
    },
    {
        title: "PAGES",
        route: "New Record",
        description: "Allows managers to log new purchases and material usage on the construction site.",
    },
    {
        title: "PAGES",
        route: "Attendance",
        description: "Tracks employee attendance, including arrival and departure times.",
    },
    {
        title: "PAGES",
        route: "Employees",
        description: "Lists all workers on site, including their roles and contact details.",
    },
    {
        title: "PAGES",
        route: "History",
        description: "Shows historical records of employee attendance and material usage over time.",
    },
    {
        title: "PAGES",
        route: "Administrator",
        description: "Admin-only section to oversee all activities, manage users, and set permissions.",
    },
];

const About = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % sections.length);
        }, 8000); // Change section every 8 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="edited" className="relative w-[400px] h-[200px] overflow-hidden flex justify-center items-center bg-gray-200 rounded-lg shadow-md">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ x: 100, opacity: 0 }}  // Incoming div starts from right
                    animate={{ x: 0, opacity: 1 }} // Moves into place
                    exit={{ x: -100, opacity: 0 }} // Old div slides left & disappears
                    transition={{ duration: 2 }}
                    className="absolute w-full h-full flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-lg"
                >
                    <h2 className="text-xl font-bold">{sections[index].title}</h2>
                    <hr className="border-gray-400 my-2 w-full" />
                    <h3 className="text-lg font-semibold underline">{sections[index].route}</h3>
                    <p className="text-gray-700 mt-2 text-center">{sections[index].description}</p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default About;
