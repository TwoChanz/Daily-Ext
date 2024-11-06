import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<any>(null);
    const [location, setLocation] = useState(localStorage.getItem("location") || "New York");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1099cdf98c3dc8cdea8a8c1eef0e24e8&units=${unit}`
                );
                setWeather(response.data);
            } catch (error) {
                setError("Location not found. Please try again.");
                console.error("Error fetching weather data:", error);
            }
            setLoading(false);
        };
        fetchWeather();
    }, [location, unit]);

    useEffect(() => {
        localStorage.setItem("location", location);
    }, [location]);

    return (
        <div className="weather-widget">
            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                weather && (
                    <div>
                        <h3>{weather.name}</h3>
                        <p>{weather.main.temp}°{unit === "metric" ? "C" : "F"}</p>
                        <p>{weather.weather[0].description}</p>
                    </div>
                )
            )}
            <button onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}>
                Show in {unit === "metric" ? "Fahrenheit" : "Celsius"}
            </button>
        </div>
    );
};

export default WeatherWidget;
