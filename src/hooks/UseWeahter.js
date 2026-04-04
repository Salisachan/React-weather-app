import { useState, useCallback } from 'react'

// get API key from .env file
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// custom hook that handles all weather fetching and state management
function useWeather(unit) {
    // stores current weather data from API
    const [weather, setWeather] = useState(null)
    // stores 5-day forecast data from API
    const [forecast, setForecast] = useState(null)
    // tracks whether a fetch is in progress
    const [loading, setLoading] = useState(false)
    // stores error message if fetch fails
    const [error, setError] = useState(null)

    // useCallback prevents recreating this function unless unit changes
    const fetchWeather = useCallback(async (city) => {
        // do nothing if input is empty
        if (!city.trim()) return

        setLoading(true)
        setError(null)

        try {
            // fetch current weather by city name
            const weatherRes = await fetch(
                `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
            )

            // handle specific error status codes
            if (!weatherRes.ok) {
                if (weatherRes.status === 404) {
                    throw new Error(`City "${city}" not found. Please check the spelling and try again.`)
                } else if (weatherRes.status === 401) {
                    throw new Error('Invalid API key. Please check your .env file.')
                } else {
                    throw new Error('Failed to fetch weather data. Please try again later.')
                }
            }

            // convert response to JSON
            const weatherData = await weatherRes.json()

            // fetch 5-day forecast using same city
            const forecastRes = await fetch(
                `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
            )
            const forecastData = await forecastRes.json()

            // save both results to state
            setWeather(weatherData)
            setForecast(forecastData)

        } catch (err) {
            // save error message and clear any previous weather data
            setError(err.message)
            setWeather(null)
            setForecast(null)
        } finally {
            // always stop loading whether fetch succeeded or failed
            setLoading(false)
        }
    }, [unit])

    // return everything App.jsx needs
    return { weather, forecast, loading, error, fetchWeather }
}

export default useWeather