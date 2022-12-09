import { useContext } from "react"
import { FaCalendarAlt } from "react-icons/fa"
import { friendlyTodaysDate } from "../utils/utils"
import WeatherContext from "../context/weather/WeatherContext"
import HourlyWeatherCard from "../components/HourlyWeatherCard"
import DailyWeatherCard from "../components/DailyWeatherCard"
import { Oval } from "react-loader-spinner"


function Forecast() {
    const { hourlyForecast, dailyForecast, weatherDataLoading } = useContext(WeatherContext)

    if (weatherDataLoading) {
        return <Oval
            height={60}
            width={60}
            color="white"
            wrapperClass="flex justify-center items-center my-48"
            secondaryColor="white"
            strokeWidth={3}
            strokeWidthSecondary={3}
        />
    }
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
                    {hourlyForecast.map((element, index) => <HourlyWeatherCard key={index} weather={element} selected={index === 0} />)}
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