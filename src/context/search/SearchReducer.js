const searchReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEARCH_GEOLOCATION': return {...state, searchGeolocation: action.payload};
        case 'SET_LOCATIONS': return {...state, savedWeatherData: action.payload};
        default: return state
    }
}

export default searchReducer