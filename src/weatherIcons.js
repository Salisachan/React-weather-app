// maps OpenWeatherMap icon codes to basmilius weather icon names
const iconMap = {
    '01d': 'clear-day',
    '01n': 'clear-night',
    '02d': 'partly-cloudy-day',
    '02n': 'partly-cloudy-night',
    '03d': 'cloudy',
    '03n': 'cloudy',
    '04d': 'overcast-day',
    '04n': 'overcast-night',
    '09d': 'drizzle',
    '09n': 'drizzle',
    '10d': 'rain',
    '10n': 'rain',
    '11d': 'thunderstorms-day',
    '11n': 'thunderstorms-night',
    '13d': 'snow',
    '13n': 'snow',
    '50d': 'mist',
    '50n': 'mist',
}

// returns the basmilius icon name for a given OpenWeatherMap icon code
export function getWeatherIcon(iconCode) {
    return iconMap[iconCode] || 'not-available'
}