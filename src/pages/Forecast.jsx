import { useState } from "react"
import { useEffect } from "react"
import HourlyWeatherCard from "../components/HourlyWeatherCard"
import { getForecastData } from "../context/WeatherActions"
import { friendlyTodaysDate } from "../utils/utils"
import { FaCalendarAlt } from "react-icons/fa"
import DailyWeatherCard from "../components/DailyWeatherCard"


function Forecast() {
    const [geolocation, setGeolocation] = useState(null)
    const [hourlyData, setHourlyData] = useState([])
    const [dailyForecast, setDailyForecast] = useState([])

    const {lat, lon} = {...geolocation}

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
            const { hourlyData, dailyData} = await getForecastData(lat, lon, 7)
            console.log(dailyData)
            setHourlyData(hourlyData)
            setDailyForecast(dailyData)            
        }
        geolocation !== null && getData()
    }, [geolocation])

    return <div>
        <header className="text-center pt-4 pb-6">
            <p className="text-3xl">Forecast Report</p>
        </header>
        <main className="px-2">
            <div className="mt-4">
                <div className="flex justify-between items-baseline">
                    <p className="text-xl font-semibold">Today</p>
                    <p className="text-sm">{ friendlyTodaysDate() }</p>
                </div>
                <div className="mt-4 grid gap-4 grid-flow-col overflow-auto -mr-2">
                    {hourlyData.map((element, index) => <HourlyWeatherCard key={index} weather={element} selected={index === 0} />)}
                </div>
            </div>
            <div className="mt-10">
                <div className="flex justify-between items-baseline">
                    <p className="text-xl font-semibold">Next Forecast</p>
                    <FaCalendarAlt />
                </div>
                <div className="grid gap-5 mt-5">
                    {dailyForecast.map((element, index) => <DailyWeatherCard key={index} weatherData={element} />)}
                </div>
            </div>
        </main>
    </div>
}
export default Forecast