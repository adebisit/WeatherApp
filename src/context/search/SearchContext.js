import { createContext, useContext, useEffect, useReducer } from "react";
import searchReducer from "./SearchReducer";
import { getBulkWeatherData } from "../weather/WeatherActions";
import WeatherContext from "../weather/WeatherContext";


const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
    const {units} = useContext(WeatherContext)
    const initialState = {
        searchGeolocation: null,
        savedWeatherData: []
    }

    const [state, dispatch] = useReducer(searchReducer, initialState)

    useEffect(() => {
        const getData = async () => {
            let savedLocations = JSON.parse(localStorage.getItem('savedLocations'))
            if (savedLocations === null) {
                savedLocations = []
                localStorage.setItem("savedLocations", JSON.stringify([]))
            }
            const data = await getBulkWeatherData(savedLocations, units)
            dispatch({
                type: 'SET_LOCATIONS',
                payload: data
            })
        }
        getData()
        // eslint-disable-next-line
    }, [])

    return <SearchContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </SearchContext.Provider>
}

export default SearchContext