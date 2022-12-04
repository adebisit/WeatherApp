import { useState, useEffect } from "react"
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
import Predict from "../components/Predict";
import AirQuality from "../components/AirQuality";
import HourlyWeatherCard from "../components/HourlyWeatherCard";
import { getHourlyWeatherForecast } from "../context/WeatherActions"
import { friendlyTodaysDate } from "../utils/utils"


function Home() {
    const location = useLocation()
    const navigate = useNavigate()
    const [hourlyData, setHourlyData] = useState([])
    const [geolocation, setGeolocation] = useState(null)
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
        const getWeatherData = async () => {
            const hourData = await getHourlyWeatherForecast(lat, lon)
            setHourlyData(hourData)
        }
        if (geolocation !== null) { 
            getWeatherData()
        }
    }, [geolocation])


    return (
        <div>
            <header>
                <div className="text-center mb-8">
                    <h4 className="text-4xl pb-2">New York</h4>
                    <p className="text-sm">{ friendlyTodaysDate() }</p>
                </div>
            </header>
            <main>
                <div className="flex w-8/12 m-auto rounded-xl" style={{backgroundColor: '#171642'}}>
                    <button
                        className={`flex-1 p-3 text-center rounded-xl focus:outline-none ${location.pathname === '/predict' && 'shadow-md shadow-inner'}`}
                        style={{backgroundColor: location.pathname === '/predict' && '#1B86E6'}}
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
                        <Route path='/predict' element={<Predict geolocation={geolocation} />} />
                        <Route path='/air-quality' element={<AirQuality geolocation={geolocation} />} />
                    </Routes>
                </div>
                <div className="my-16">
                    <div className="flex justify-between items-baseline">
                        <p className="text-3xl">Today</p>
                        <Link to="/" className="font-bold" style={{color: "#1B86E6"}}>View full report</Link>
                    </div>
                    <div className="mt-8 grid gap-4 grid-flow-col overflow-auto">
                        {hourlyData.map((element, index) => <HourlyWeatherCard key={index} weather={element} selected={index === 0} />)}
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Home