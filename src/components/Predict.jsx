import { useEffect, useState } from "react"
import { getCurrentWeatherData } from "../context/WeatherActions"
import { AiFillPushpin } from 'react-icons/ai'


function Predict({ geolocation, pinWeatherSearchResult }) {
    const [ weatherData, setWeatherData ] = useState(null)
    const { temp, wind, humidity, icon, main, description } = {...weatherData}
    const {lat, lon} = {...geolocation}

    useEffect(() => {
        const getWeatherData = async () => {
            const data = await getCurrentWeatherData(lat, lon)
            setWeatherData((prev) => ({...prev, ...data}))
        }
        if (geolocation !== null) { getWeatherData() }
    }, [])

    return (
        <div
            className="p-5 rounded-2xl "
            style={{backgroundColor: pinWeatherSearchResult !== undefined && '#1B86E6'}}
        >
            {pinWeatherSearchResult !== undefined && (
                <div className="flex justify-between align-center px-4">
                    <p className="font-bold text-xl">{geolocation.state}, {geolocation.countryCode}</p>
                    <button className="p-2 rounded-full border border-solid border-white outline-none" onClick={() => pinWeatherSearchResult({ geolocation, weatherData})}>
                        <AiFillPushpin size={15}/>
                    </button>
                </div>
            )}
            <div>
                <p className="text-center text-4xl font-bold ">{main}</p>
                <p className="text-center text-base">{description}</p>
                <img className="m-auto" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='temp' style={{height: '200px'}}/>
            </div>
            <div className="flex w-5/6 mx-auto justify-between">
                <div className="text-center">
                    <p className="font-light">Temp</p>
                    <p className="font-bold">{temp}&#176;C</p>
                </div>
                <div className="text-center">
                    <p className="font-light">Wind</p>
                    <p className="font-bold">{wind} m/h</p>
                </div>
                <div className="text-center">
                    <p className="font-light">Humidity</p>
                    <p className="font-bold">{humidity}%</p>
                </div>
            </div>
        </div>
    )
}
export default Predict