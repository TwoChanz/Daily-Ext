// src/App.tsx

import React, { useState, useEffect } from 'react';
import WeatherWidget from './components/WeatherWidget';
import CalendarWidget from './components/CalendarWidget';
import NewsWidget from './components/NewsWidget';
import QuoteWidget from './components/QuoteWidget';
import './App.css';

const App: React.FC = () => {
    // Track dark mode state and save it to localStorage
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

    // Update localStorage whenever darkMode state changes
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);

    return (
        <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
            {/* Button to toggle dark mode */}
            <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Render widgets */}
            <WeatherWidget />
            <CalendarWidget />
            <NewsWidget />
            <QuoteWidget />
        </div>
    );
};

export default App;
