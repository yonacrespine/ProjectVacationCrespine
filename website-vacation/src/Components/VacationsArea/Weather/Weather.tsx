import { useEffect, useState } from "react";
import "./Weather.css";
import axios from "axios";
import myVacationService from "../../../03-Service/VacationsService";

interface WeatherProps {
    destination: string;
}

function Weather({ destination }: WeatherProps): JSX.Element {
    const [coordinates, setCoordinates] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });
    const [weather, setWeatherData] = useState<any>(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const coords = await  myVacationService.getCoordinatesFromAddress(destination)
                setCoordinates(coords);
                fetchWeather(coords);
            } catch (error) {
                console.error('Error retrieving coordinates:', error);
            }
        };

        const fetchWeather = async ({ lat, lng }: { lat: number, lng: number }) => {
            try {
                const response = await axios.get(`http://localhost:3001/api/weather`, {
                    params: { lat, lng }
                });
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error retrieving weather data:', error);
            }
        };

        fetchCoordinates();
    }, [destination]);
    return (
        <div className="Weather">
             {weather ? (
                <div>
                    
                    <p>🌤️: {weather.hourly.temperature_2m[0]} °C</p>
                  
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}

export default Weather;
