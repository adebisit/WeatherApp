import { useContext } from "react"
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom"
import { friendlyTodaysDate } from "../utils/utils"
import Predict from "../components/Predict"
import AirQuality from "../components/AirQuality"
import HourlyWeatherCard from "../components/HourlyWeatherCard"
import WeatherContext from '../context/weather/WeatherContext'
import { Oval } from "react-loader-spinner"
import { toast } from "react-toastify"
import { useEffect } from "react"


function Home() {
    const location = useLocation()
    const navigate = useNavigate()
    const {geolocation, weatherDataLoading} = useContext(WeatherContext)
    const {state, countryCode} = {...geolocation}
    
    const {currentWeather, hourlyForecast, pollutantComponents} = useContext(WeatherContext)
    useEffect(() => {
        if (geolocation === null) {
            toast.error('Please set default location first.')
            navigate('/settings/edit')
        }
        // eslint-disable-next-line
    }, [geolocation])
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
    return (
        <div>
            <header>
                <div className="text-center mb-8">
                    <h4 className="text-4xl pb-2">{state}, <span className="text-lg">{countryCode}</span></h4>
                    <p className="text-sm">{ friendlyTodaysDate() }</p>
                </div>
            </header>
            <main>
                <div className="flex w-8/12 m-auto rounded-xl" style={{backgroundColor: '#171642'}}>
                    <button
                        className={`flex-1 p-3 text-center rounded-xl focus:outline-none ${location.pathname === '/predict' && 'shadow-md shadow-inner'}`}
                        style={{backgroundColor: (location.pathname === '/predict' || location.pathname === '/') && '#1B86E6'}}
                        onClick={() => navigate('/predict')}
                    >
                        Forecast
                    </button>
                    <button
                        className={`flex-1 p-3 text-center rounded-xl focus:outline-none ${location.pathname === '/air-quality' && 'shadow-md shadow-inner'}`}
                        style={{backgroundColor: location.pathname === '/air-quality' && '#1B86E6'}}
                        onClick={() => navigate('/air-quality')}
                    >
                        Air Quality
                    </button>
                </div>
                <div className="my-8">
                    <Routes>
                        <Route index element={<Predict weatherData={currentWeather} />} />
                        <Route path='/predict' element={<Predict weatherData={currentWeather} />} />
                        <Route path='/air-quality' element={<AirQuality components={pollutantComponents} />} />
                    </Routes>
                </div>
                <div className="my-16">
                    <div className="flex justify-between items-baseline">
                        <p className="text-3xl">Today</p>
                        <Link to="/" className="font-bold" style={{color: "#1B86E6"}}>View full report</Link>
                    </div>
                    <div className="mt-8 grid gap-4 grid-flow-col overflow-auto">
                        {hourlyForecast.map((element, index) => <HourlyWeatherCard key={index} weather={element} selected={index === 0} />)}
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Home