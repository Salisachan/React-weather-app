import React from 'react'
import { getWeatherIcon } from '../weatherIcons'

// groups 3-hour intervals into daily summaries
function groupByDay(list) {
    const days = {}

    list.forEach((item) => {
        const date = new Date(item.dt * 1000)
        const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

        if (!days[dayKey]) {
            days[dayKey] = []
        }
        days[dayKey].push(item)
    })

    // pick the entry closest to noon for each day
    return Object.entries(days).slice(0, 5).map(([day, entries]) => {
        const midday = entries.reduce((best, curr) => {
            const bestHour = new Date(best.dt * 1000).getHours()
            const currHour = new Date(curr.dt * 1000).getHours()
            return Math.abs(currHour - 12) < Math.abs(bestHour - 12) ? curr : best
        })

        // get high and low from all entries for that day
        const temps = entries.map(e => e.main.temp)
        return {
            day,
            icon: midday.weather[0].icon,
            description: midday.weather[0].description,
            high: Math.round(Math.max(...temps)),
            low: Math.round(Math.min(...temps)),
            humidity: midday.main.humidity,
        }
    })
}

function Forecast({ data, unit }) {
    const unitSymbol = unit === 'metric' ? '°C' : '°F'
    const days = groupByDay(data.list)

    return (
        <div className="forecast">
            <h3 className="forecast__title">5-Day Forecast</h3>
            <div className="forecast__grid">
                {days.map((day, i) => (
                    <div className="forecast__card" key={i}>
                        {/* show abbreviated day name */}
                        <p className="forecast__day">{day.day.split(',')[0]}</p>
                        {/* basmilius animated icon */}
                        <img
                            className="forecast__icon"
                            src={getWeatherIcon(day.icon)}
                            alt={day.description}
                        />
                        <p className="forecast__desc">{day.description}</p>
                        {/* high and low temps for the day */}
                        <p className="forecast__temps">
                            <span className="forecast__high">{day.high}{unitSymbol}</span>
                            <span className="forecast__low"> / {day.low}{unitSymbol}</span>
                        </p>
                        <p className="forecast__humidity">💧 {day.humidity}%</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Forecast