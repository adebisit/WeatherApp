import { createContext, useEffect, useReducer } from "react";
import searchReducer from "./SearchReducer";
import { getBulkWeatherData } from "../weather/WeatherActions";


const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
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
            const data = await getBulkWeatherData(savedLocations)
            dispatch({
                type: 'SET_LOCATIONS',
                payload: data
            })
        }
        getData()
    }, [])

    return <SearchContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </SearchContext.Provider>
}

export default SearchContext