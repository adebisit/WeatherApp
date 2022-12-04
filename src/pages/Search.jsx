import { useEffect, useState } from "react"
import LocationSearchBox from "../components/shared/LocationSearchBox"
import Predict from "../components/Predict"
import useLocalStorage from "../hooks/useLocalStorage"
import { getBulkWeatherData } from "../context/WeatherActions"
import SavedWeatherCard from "../components/SavedWeatherCard"


function Search() {
    const [savedLocations, setSavedLocations] = useLocalStorage('savedLocations', [])
    const [searchGeolocation, setSearchGeolocation] = useState(null)
    const [savedWeatherData, setSavedWeatherData] = useState([])

    useEffect(() => {
        const getWeatherData = async () => {
            const data = await getBulkWeatherData(savedLocations)
            setSavedWeatherData(data)
        }
        getWeatherData()
    }, [])

    const locationSelected = async (geolocation) => {
        setSearchGeolocation(geolocation)
    }

    const pinWeatherSearchResult = ({geolocation, weatherData}) => {
        if (savedWeatherData.length >= 5) {
            alert('You can only pin 5 items')
            return
        }
        if (!(savedLocations.some(loc => loc.state === geolocation.state && loc.countryCode === geolocation.countryCode))) {
            setSavedLocations(prev => ([...prev, {...geolocation}]))
            setSavedWeatherData(prev => [...prev, {...geolocation, weatherData}])
        }
        setSearchGeolocation(null)
        // Move tile to bottom and clear input
    }

    const unpinWeatherSearchResult = ({state, countryCode}) => {
        setSavedWeatherData(prev => (
            prev.filter(pinned => !(pinned.state === state && pinned.countryCode === countryCode))
        ))

        setSavedLocations(prev => (
            prev.filter(pinned => !(pinned.state === state && pinned.countryCode === countryCode))    
        ))
    }

    return (<div>
        <header className="text-center pt-4 pb-6">
            <p className="text-3xl">Pick A Location</p>
            <p className="text-sm">Search by area or city to see weather information</p>
            <div className="my-4">
                <LocationSearchBox locationSelected={locationSelected}/>
            </div>
        </header>
        <main>
            {searchGeolocation !== null && <Predict geolocation={searchGeolocation} pinWeatherSearchResult={pinWeatherSearchResult}/>}
            <div className="grid gap-5 grid-cols-2 mt-5">
                {savedWeatherData.map((locationData, index) => (
                    <div key={index} className="">
                        <SavedWeatherCard
                            state={locationData.state}
                            countryCode={locationData.countryCode}
                            weatherData={locationData.weatherData}
                            unpinWeatherSearchResult={unpinWeatherSearchResult}
                        />
                    </div>
                ))}
            </div>
        </main>
    </div>)
}
export default Search