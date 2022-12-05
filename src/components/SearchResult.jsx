import { useState, useEffect } from "react"
import { fetchWeatherData } from "../context/weather/WeatherActions"
import Predict from "./Predict"
import { AiFillPushpin } from 'react-icons/ai'


function SearchResult({ geolocation, addToSavedLocations }) {
    const [weatherData, setWeatherData] = useState(null)
    const {state, countryCode} = {...geolocation}

    useEffect(() => {
        const getWeatherData = async () => {
            const resp = await fetchWeatherData(geolocation.lat, geolocation.lat)
            const data =resp.data
            const weatherData = {
                ...data.current,
                ...data.current.weather[0]
            }
            setWeatherData(weatherData)
        }
        geolocation !== null && getWeatherData()
    }, [geolocation])

    return (
        <div className="p-5 rounded-2xl" style={{backgroundColor: '#1B86E6'}}>
            <div className="flex justify-between align-center px-4">
                <p className="font-bold text-xl">{state}, {countryCode}</p>
                <button className="p-2 rounded-full border border-solid border-white outline-none" onClick={() => addToSavedLocations(geolocation, weatherData)}>
                    <AiFillPushpin size={15}/>
                </button>
            </div>
           <Predict weatherData={weatherData}/>
    </div>
    )
}
export default SearchResult