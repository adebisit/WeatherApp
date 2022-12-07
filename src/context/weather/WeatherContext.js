import { createContext, useEffect, useState, useReducer } from "react";
import { getWeatherData } from "../../context/weather/WeatherActions"
import weatherReducer from "./WeatherReducer"


const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
    const initialSettings = {
        geolocation: null,
        units: "imperial"
    }

    const [state, dispatch] = useReducer(weatherReducer, initialSettings)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [pollutantComponents, setPollutantComponents] = useState([])
    const [hourlyForecast, setHourlyForecast] = useState([])
    const [dailyForecast, setDailyForecast] = useState([])

    useEffect(() => {
        const geolocation = JSON.parse(localStorage.getItem("geolocation"))
        const units = localStorage.getItem('units') ?? "standard"
        dispatch({
            type: "UPDATE_SETTINGS",
            payload: {
                geolocation,
                units
            }            
        })
    }, [])

    useEffect(() => {
        const getData = async () => {
            const {lat, lon} = {...state.geolocation}
            const units = state.units
            const {currentData, hourData, dailyData, pollutantComponents} = await getWeatherData(lat, lon, units)
            setCurrentWeather(currentData)
            setHourlyForecast(hourData)
            setDailyForecast(dailyData)
            setPollutantComponents(pollutantComponents)
        }
        state.geolocation !== null && getData()
    }, [state.geolocation])

    return <WeatherContext.Provider value={{
        currentWeather,
        hourlyForecast,
        dailyForecast,
        pollutantComponents,
        ...state,
        dispatch
    }}>
        {children}
    </WeatherContext.Provider>
}

export default WeatherContext