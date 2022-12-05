import { createContext, useEffect, useState } from "react";
import { getWeatherData } from "../../context/weather/WeatherActions"

const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
    const [geolocation, setGeolocation] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [pollutantComponents, setPollutantComponents] = useState([])
    const [hourlyForecast, setHourlyForecast] = useState([])
    const [dailyForecast, setDailyForecast] = useState([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setGeolocation({lat: pos.coords.latitude, lon: pos.coords.longitude})
            },
            () => {
                alert("Couldn't determine location")
            }

        )
    }, [])

    useEffect(() => {
        const getData = async () => {
            const {currentData, hourData, dailyData, pollutantComponents} = await getWeatherData(geolocation.lat, geolocation.lon)
            setCurrentWeather(currentData)
            setHourlyForecast(hourData)
            setDailyForecast(dailyData)
            setPollutantComponents(pollutantComponents)
        }
        geolocation !== null && getData()
    }, [geolocation])

    return <WeatherContext.Provider value={{
        geolocation,
        currentWeather,
        hourlyForecast,
        dailyForecast,
        pollutantComponents
    }}>
        {children}
    </WeatherContext.Provider>
}

export default WeatherContext