import axios from "axios";

const OPEN_WEATHER_API = process.env.REACT_APP_OPEN_WEATHER_API
const openWeather = axios.create({
    baseURL: 'http://api.openweathermap.org'
})


export const reverseGeocoding = async (lat, lon) => {
    const params = new URLSearchParams({
        lat,
        lon,
        limit: 10,
        appid: OPEN_WEATHER_API
    })
    const resp = await openWeather.get(`/geo/1.0/reverse?${params}`)
    const data = await resp.data
    console.log(data)
    return data
}


export const fetchWeatherData = (lat, lon) => {
    const params = new URLSearchParams({
        lat,
        lon,
        appid: OPEN_WEATHER_API,
        units: 'metric'
    })
    return openWeather.get(`/data/3.0/onecall?${params}`)
}


export const fetchAirQualityData = async (lat, lon) => {
    const params = new URLSearchParams({
        lat,
        lon,
        appid: OPEN_WEATHER_API
    })
    return openWeather.get(`/data/2.5/air_pollution?${params}`)
}


export const getBulkWeatherData = (geolocations) => {
    return Promise.allSettled(geolocations.map(
        ({lat, lon}) => fetchWeatherData(lat, lon))
    ).then((responses) => 
        responses.filter(resp => resp.status === 'fulfilled').map((resp, i) => ({
            ...geolocations[i],
            weatherData: {
                temp: resp.value.data.current.temp,
                wind: resp.value.data.current.wind_speed,
                humidity: resp.value.data.current.humidity,
                icon: resp.value.data.current.weather[0].icon,
                main: resp.value.data.current.weather[0].main,
                description: resp.value.data.current.weather[0].description
            }
        }))
    ).catch((err) => {

    })
}


export const getWeatherData = (lat, lon) => {
    return Promise.allSettled([
        fetchWeatherData(lat, lon),
        fetchAirQualityData(lat, lon)
    ]).then((responses) => {
        const weatherData = responses[0].status === 'fulfilled' ? responses[0].value.data : null
        const pollutantConcentrations= responses[0].status === 'fulfilled' ? responses[1].value.data : null
        
        let currentData = null
        let pollutantComponents = null
        let hourData = []
        let dailyData = []
        if (weatherData) {
            weatherData.hourly.slice(0, 7).forEach(record => {
                let options = {hour: 'numeric', minute: 'numeric'};
                hourData.push({
                    dt: new Date(record.dt * 1000).toLocaleTimeString('GMT', options),
                    temp: record.temp,
                    humidity: record.humidity,
                    wind: record.wind_speed,
                    icon: record.weather[0].icon,
                    main: record.weather[0].main,
                    description: record.weather[0].description
                })
            });
            weatherData.daily.slice(0, 7).forEach(record => {
                const date = new Date(record.dt * 1000)
                dailyData.push({
                    day: date.toLocaleDateString('GMT', {weekday: 'long'}),
                    dt: `${date.toLocaleDateString('GMT', {month: 'short'})}, ${date.toLocaleDateString('GMT', {day: '2-digit'})}`,
                    temp: record.temp.day,
                    icon: record.weather[0].icon,
                })
            })

            currentData = {
                ...weatherData.current,
                ...weatherData.current.weather[0]
            }
        }
        if (pollutantConcentrations) {
            pollutantComponents = pollutantConcentrations.list[0].components
        }
        return {currentData, hourData, dailyData, pollutantComponents}
    }).catch((err) => {
    })
}