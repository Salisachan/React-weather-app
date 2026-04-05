import React from 'react'
import { getWeatherIcon } from '../weatherIcons'

function CurrentWeather({ data, unit }) {
    const { name, sys, weather, main, wind, visibility } = data

    const unitSymbol = unit === 'metric' ? '°C' : '°F'
    const windUnit = unit === 'metric' ? 'm/s' : 'mph'

    // convert metres to km or miles based on unit
    const formatVisibility = (vis) => {
        if (!vis) return 'N/A'
        return unit === 'metric'
            ? `${(vis / 1000).toFixed(1)} km`
            : `${(vis / 1609).toFixed(1)} mi`
    }

    return (
        <div className="current-weather">
            <div className="current-weather__location">
                <h2>{name}, {sys.country}</h2>
            </div>

            <div className="current-weather__main">
                {/* basmilius animated weather icon */}
                <img
                    className="current-weather__icon"
                    src={getWeatherIcon(weather[0].icon)}
                    alt={weather[0].description}
                />
                <div className="current-weather__temp">
                    {Math.round(main.temp)}{unitSymbol}
                </div>
            </div>

            {/* capitalize first letter of description */}
            <p className="current-weather__desc">
                {weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}
            </p>

            <p className="current-weather__feels">
                Feels like {Math.round(main.feels_like)}{unitSymbol}
                &nbsp;·&nbsp;
                High {Math.round(main.temp_max)}{unitSymbol}
                &nbsp;·&nbsp;
                Low {Math.round(main.temp_min)}{unitSymbol}
            </p>

            {/* weather stats grid */}
            <div className="current-weather__stats">
                <div className="stat">
                    <img className="stat__icon" src="https://cdn.jsdelivr.net/gh/basmilius/weather-icons@2.0.0/production/fill/all/humidity.svg" alt="humidity" />
                    <span className="stat__label">Humidity</span>
                    <span className="stat__value">{main.humidity}%</span>
                </div>
                <div className="stat">
                    <img className="stat__icon" src="https://cdn.jsdelivr.net/gh/basmilius/weather-icons@2.0.0/production/fill/all/wind.svg" alt="wind" />
                    <span className="stat__label">Wind</span>
                    <span className="stat__value">{wind.speed} {windUnit}</span>
                </div>
                <div className="stat">
                    <img className="stat__icon" src="https://cdn.jsdelivr.net/gh/basmilius/weather-icons@2.0.0/production/fill/all/mist.svg" alt="visibility" />
                    <span className="stat__label">Visibility</span>
                    <span className="stat__value">{formatVisibility(visibility)}</span>
                </div>
                <div className="stat">
                    <img className="stat__icon" src="https://cdn.jsdelivr.net/gh/basmilius/weather-icons@2.0.0/production/fill/all/thermometer.svg" alt="pressure" />
                    <span className="stat__label">Pressure</span>
                    <span className="stat__value">{main.pressure} hPa</span>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather