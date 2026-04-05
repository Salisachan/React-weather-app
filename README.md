# Skycast — React Weather Forecast App

A dynamic weather forecasting app built with React and the OpenWeatherMap API. Displays current conditions and a 5-day forecast with a modern glassmorphism UI.

## Features

- Search weather by city name
- Current weather: temperature, feels-like, humidity, wind speed, visibility, pressure
- 5-day forecast with daily high/low and conditions
- Toggle between Celsius and Fahrenheit
- User-friendly error handling (invalid city, API failures)
- Fully responsive for mobile and desktop
- Smooth CSS animations and transitions
- Animated weather icons by Bas Milius

## Tech Stack

- **React** (v18) — component-based UI, hooks (`useState`, `useEffect`, `useCallback`)
- **Vite** — development environment and build tool
- **OpenWeatherMap API** — current weather + 5-day forecast endpoints
- **CSS** — custom properties, glassmorphism, keyframe animations
- **Google Fonts** — Syne (headings) + DM Sans (body)
- **Basmilius Weather Icons** — animated SVG weather icons

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx        # City search input + submit button
│   ├── CurrentWeather.jsx   # Current conditions card
│   ├── Forecast.jsx         # 5-day forecast grid
│   └── ErrorMessage.jsx     # Error alert component
├── hooks/
│   └── useWeather.js        # Custom hook: API fetching + state management
├── weatherIcons.js          # Maps OpenWeatherMap icon codes to Basmilius icons
├── App.jsx                  # Root component, layout, unit toggle
├── App.css                  # All styles
└── main.jsx                 # React entry point
```

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/React-Weather-App.git
cd React-Weather-App
```

### 2. Install dependencies
```bash
npm install
```

### 3. Get a free OpenWeatherMap API key

1. Register at [https://openweathermap.org/api](https://openweathermap.org/api)
2. Go to **API Keys** in your account dashboard
3. Copy your default key (it may take a few minutes to activate)

### 4. Set up your environment variable
```bash
cp .env.example .env
```

Open `.env` and replace `your_api_key_here` with your actual key:

```bash
VITE_WEATHER_API_KEY=your_api_key_here
```
Note: Never commit your `.env` file. It is already in `.gitignore`.

### 5. Run the app
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `/data/2.5/weather` | Current weather by city name |
| `/data/2.5/forecast` | 3-hour interval forecast (5 days) |

Both use the free tier. The `units` parameter switches between `metric` (Celsius) and `imperial` (Fahrenheit).

## Credits

- Weather data by [OpenWeatherMap](https://openweathermap.org/)
- Animated SVG icons by [Bas Milius](https://github.com/basmilius/weather-icons)
- Fonts by [Google Fonts](https://fonts.google.com/)