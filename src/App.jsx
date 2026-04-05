import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import ErrorMessage from './components/ErrorMessage'
import useWeather from './hooks/useWeather'
import './App.css'

function App() {
  // track selected unit - metric = Celsius, imperial = Fahrenheit
  const [unit, setUnit] = useState('metric')

  // get all weather data and functions from custom hook
  const { weather, forecast, loading, error, fetchWeather } = useWeather(unit)

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric')
  }

  // re-fetch weather when unit changes if a city is already loaded
  useEffect(() => {
    if (weather?.name) {
      fetchWeather(weather.name)
    }
  }, [unit])

  return (
    <div className="app">
      <div className="app__bg" />
      <div className="app__content">
        <header className="app__header">
          <h1 className="app__title">
            <span className="app__title-icon">☁</span>
            Skycast
          </h1>
          {/* toggle between Celsius and Fahrenheit */}
          <button className="unit-toggle" onClick={toggleUnit}>
            <span className={unit === 'metric' ? 'active' : ''}>°C</span>
            <span className="unit-toggle__divider">/</span>
            <span className={unit === 'imperial' ? 'active' : ''}>°F</span>
          </button>
        </header>

        {/* search bar - passes fetchWeather as onSearch */}
        <SearchBar onSearch={fetchWeather} loading={loading} />

        {/* show error if fetch failed */}
        {error && <ErrorMessage message={error} />}

        {/* show weather data only if fetch succeeded */}
        {weather && !error && (
          <>
            <CurrentWeather data={weather} unit={unit} />
            {forecast && <Forecast data={forecast} unit={unit} />}
          </>
        )}

        {/* empty state before any search */}
        {!weather && !error && !loading && (
          <div className="app__empty">
            <p>Enter a city name to get the current weather and 5-day forecast.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
