import { useState, useEffect, useContext } from "react"
import { fetchWeatherData } from "../context/weather/WeatherActions"
import Predict from "./Predict"
import WeatherContext from "../context/weather/WeatherContext"
import { AiFillPushpin } from 'react-icons/ai'
import { Oval } from "react-loader-spinner"


function SearchResult({ geolocation, addToSavedLocations }) {
    const {units} = useContext(WeatherContext)
    const [weatherData, setWeatherData] = useState(null)
    const {state, countryCode} = {...geolocation}
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getWeatherData = async () => {
            const resp = await fetchWeatherData(geolocation.lat, geolocation.lat, units)
            const data =resp.data
            const weatherData = {
                ...data.current,
                ...data.current.weather[0]
            }
            setWeatherData(weatherData)
            setIsLoading(false)
        }
        geolocation !== null && getWeatherData()
        // eslint-disable-next-line
    }, [geolocation])

    if (isLoading) {
        return <Oval
            height={30}
            width={30}
            color="white"
            wrapperClass="flex justify-center items-center my-48"
            secondaryColor="white"
            strokeWidth={3}
            strokeWidthSecondary={3}
        />
    }
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