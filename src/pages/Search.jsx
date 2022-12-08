import { useContext } from "react"
import LocationSearchBox from "../components/shared/LocationSearchBox"
import SavedWeatherCard from "../components/SavedWeatherCard"
import SearchResult from "../components/SearchResult"
import SearchContext from "../context/search/SearchContext"


function Search() {
    const {searchGeolocation, savedWeatherData, dispatch} = useContext(SearchContext)

    const locationSelected = async (geolocation) => {
        dispatch({
            type: 'SET_SEARCH_GEOLOCATION',
            payload: geolocation
        })
    }

    const addToSavedLocations = (geolocation, weatherData) => {
        if (savedWeatherData.length >= 5) {
            alert('You can only pin 5 items')
            return
        }
        if (!(savedWeatherData.some(loc => loc.state === geolocation.state && loc.countryCode === geolocation.countryCode))) {
            dispatch({
                type: 'SET_LOCATIONS',
                payload: [...savedWeatherData, {...geolocation, weatherData}]
            })
            localStorage.setItem("savedLocations", JSON.stringify([...savedWeatherData, geolocation]))
        }
        dispatch({
            type: 'SET_SEARCH_GEOLOCATION',
            payload: null
        })
    }

    const removeFromSavedLocations = (state, countryCode) => {
        const savedWeatherDataCopy = savedWeatherData.filter(pinned => !(pinned.state === state && pinned.countryCode === countryCode))
        dispatch({
            type: 'SET_LOCATIONS',
            payload: savedWeatherDataCopy
        })
        // savedWeatherDataCopy.map(element => delete element.weatherData)
        localStorage.setItem("savedLocations", JSON.stringify(savedWeatherDataCopy))
    }

    return (<div>
        <header className="text-center pt-4 pb-6">
            <p className="text-3xl">Pick A Location</p>
            <p className="text-sm">Search by area or city to see weather information</p>
            <div className="my-4">
                <LocationSearchBox keyword={"Test"} locationSelected={locationSelected}/>
            </div>
        </header>
        <main>
            {searchGeolocation !== null && <SearchResult geolocation={searchGeolocation} addToSavedLocations={addToSavedLocations}/>}
            <div className="grid gap-5 grid-cols-2 mt-5">
                {savedWeatherData.map((locationData, index) => (
                    <div key={index} className="">
                        <SavedWeatherCard
                            state={locationData.state}
                            countryCode={locationData.countryCode}
                            weatherData={locationData.weatherData}
                            removeFromSavedLocations={removeFromSavedLocations}
                        />
                    </div>
                ))}
            </div>
        </main>
    </div>)
}
export default Search