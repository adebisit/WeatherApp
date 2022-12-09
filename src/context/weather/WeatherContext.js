import { createContext, useEffect, useState, useReducer } from "react";
import { getWeatherData } from "../../context/weather/WeatherActions"
import weatherReducer from "./WeatherReducer"


const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
    const initialSettings = {
        geolocation: JSON.parse(localStorage.getItem("geolocation")),
        units: localStorage.getItem('units') ?? "standard"
    }

    const [state, dispatch] = useReducer(weatherReducer, initialSettings)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [pollutantComponents, setPollutantComponents] = useState([])
    const [hourlyForecast, setHourlyForecast] = useState([])
    const [dailyForecast, setDailyForecast] = useState([])
    const [weatherDataLoading, setWeatherDataLoading] = useState(true)

    // useEffect(() => {
    //     const geolocation = JSON.parse(localStorage.getItem("geolocation"))
    //     const units = localStorage.getItem('units') ?? "standard"
    //     dispatch({
    //         type: "UPDATE_SETTINGS",
    //         payload: {
    //             geolocation,
    //             units
    //         }            
    //     })
    //     // eslint-disable-next-line
    // }, [])

    useEffect(() => {
        const getData = async () => {
            const {lat, lon} = {...state.geolocation}
            const units = state.units
            const {currentData, hourData, dailyData, pollutantComponents} = await getWeatherData(lat, lon, units)
            setCurrentWeather(currentData)
            setHourlyForecast(hourData)
            setDailyForecast(dailyData)
            setPollutantComponents(pollutantComponents)
            setWeatherDataLoading(false)
        }
        state.geolocation !== null && getData()
        // eslint-disable-next-line
    }, [state.geolocation, state.units])

    return <WeatherContext.Provider value={{
        weatherDataLoading,
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