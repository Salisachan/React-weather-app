import { useState, useCallback } from 'react'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function useWeather(unit) {
    const [weather, setWeather] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchWeather = useCallback(async (city) => {
        if (!city.trim()) return

        setLoading(true)
        setError(null)

        try {
            const weatherRes = await fetch(
                `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
            )

            if (!weatherRes.ok) {
                if (weatherRes.status === 404) {
                    throw new Error(`City "${city}" not found. Please check the spelling and try again.`)
                } else if (weatherRes.status === 401) {
                    throw new Error('Invalid API key. Please check your .env file.')
                } else {
                    throw new Error('Failed to fetch weather data. Please try again later.')
                }
            }

            const weatherData = await weatherRes.json()

            const forecastRes = await fetch(
                `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
            )

            const forecastData = await forecastRes.json()

            setWeather(weatherData)
            setForecast(forecastData)

        } catch (err) {
            setError(err.message)
            setWeather(null)
            setForecast(null)
        } finally {
            setLoading(false)
        }
    }, [unit])

    return { weather, forecast, loading, error, fetchWeather }
}

export default useWeather