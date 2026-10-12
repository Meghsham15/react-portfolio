import React, { useEffect, useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    customTooltip: {
        backgroundColor: 'black',
        color: 'red',
        fontSize: '1.1vw',
        borderRadius: '8px',
        padding: '8px',
        border: "1px solid #03989e",
        fontFamily: '"Josefin Sans", sans-serif',
        boxShadow: "0px 0px 3px 0.5px #03989e",
    },
});

function WeatherWidget({ classes, className }) {
    const [degree, setDegree] = useState("");
    const [des, setDes] = useState("");
    const [weatherIcon, setWheatherIcon] = useState("");
    const [city, setCity] = useState("Pune");
    const WEATHER_APP_ID = "c931035e8ef7ccea5ad27c6b2a8f7f9b";
    const DEFAULT_CITY = "Pune";

    function applyWeatherData(data) {
        if (String(data.cod) !== "200" || !data.main) {
            return false;
        }
        const iconurl = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        setCity(data.name);
        setDegree(data.main.temp + " °C");
        setDes(data.weather[0].description);
        setWheatherIcon(iconurl);
        return true;
    }

    function fetchWeather(cityName) {
        const trimmed = (cityName || "").trim();
        if (!trimmed) {
            return;
        }
        setCity(trimmed);
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(trimmed) + "&units=metric&appid=" + WEATHER_APP_ID)
            .then(response => response.json())
            .then(data => {
                if (!applyWeatherData(data)) {
                    setCity(DEFAULT_CITY);
                }
            })
            .catch(() => {
                setCity(DEFAULT_CITY);
            });
    }

    function fetchWeatherByCoords(lat, lon) {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + WEATHER_APP_ID)
            .then(response => response.json())
            .then(data => {
                if (!applyWeatherData(data)) {
                    fetchWeather(DEFAULT_CITY);
                }
            })
            .catch(() => {
                fetchWeather(DEFAULT_CITY);
            });
    }

    useEffect(() => {
        let cancelled = false;

        async function detectVisitorCity() {
            try {
                const response = await fetch("https://ipwho.is/");
                const data = await response.json();
                if (cancelled) {
                    return;
                }
                if (data && data.success !== false && data.latitude && data.longitude) {
                    if (data.city) {
                        setCity(data.city);
                    }
                    fetchWeatherByCoords(data.latitude, data.longitude);
                    return;
                }
                if (data && data.city) {
                    fetchWeather(data.city);
                    return;
                }
            } catch {
                // Fall through to the next lookup.
            }

            try {
                const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
                const data = await response.json();
                if (cancelled) {
                    return;
                }
                if (data && data.latitude && data.longitude) {
                    if (data.city) {
                        setCity(data.city);
                    }
                    fetchWeatherByCoords(data.latitude, data.longitude);
                    return;
                }
                if (data && data.city) {
                    fetchWeather(data.city);
                    return;
                }
            } catch {
                // Fall through to the default city.
            }

            if (!cancelled) {
                fetchWeather(DEFAULT_CITY);
            }
        }

        detectVisitorCity();

        return () => {
            cancelled = true;
        };
    }, []);

    function handleCityChange(text) {
        fetchWeather(text);
    }

    return (
        <div className={"weather" + (className ? " " + className : "")}>
            <div className="deg">
                <Tooltip title="Detected from your network. Click to change the city" classes={{ tooltip: classes.customTooltip }}>
                    <p onBlur={(e) => handleCityChange(e.target.innerText)} contentEditable="true" suppressContentEditableWarning={true}>{city}</p>
                </Tooltip> : {degree}
            </div>
            <Tooltip title={`The weather in ${city} is ${des}`} classes={{ tooltip: classes.customTooltip }}>
                <div className="des">
                    {des} <img src={weatherIcon} alt="" />
                </div>
            </Tooltip>
        </div>
    );
}

export default withStyles(styles)(WeatherWidget);
