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


const fetchWeatherData = (lat, lon) => {
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
    // const resp = await openWeather.get(`/data/2.5/air_pollution?${params}`)
    // const data = await resp.data
    // return data
    return openWeather.get(`/data/2.5/air_pollution?${params}`)
}


export const getBulkWeatherData = async (geolocations) => {
    const weatherData = await Promise.allSettled(geolocations.map(
        ({lat, lon}) => fetchWeatherData(lat, lon))
    ).then(
        responses => responses.filter(resp => resp.status === 'fulfilled').map((resp, i) => ({
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
    )
    return weatherData
}


export const getCurrentWeatherData = async (lat, lon) => {
    return fetchWeatherData(lat, lon).then((resp) => {
        const data = resp.data
        return {
            temp: data.current.temp,
            wind: data.current.wind_speed,
            humidity: data.current.humidity,
            icon: data.current.weather[0].icon,
            main: data.current.weather[0].main,
            description: data.current.weather[0].description
        }
    }).catch((err) => {
        alert('Error')
        console.log(err)
        return null
    })    
}


export const getAirQualityData = async (lat, lon) => {
    return fetchAirQualityData(lat, lon).then((resp) => {
        return resp.data.list[0].components
    }).catch((err) => {
        alert('Error')
        console.log(err)
        return []
    })
}


export const getHourlyWeatherForecast = async (lat, lon, limit=5) => {
    return fetchWeatherData(lat, lon).then((resp) => {
        const data = resp.data
        const hourData = []
        data.hourly.slice(0, limit).forEach(record => {
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
        return hourData
    }).catch((err) => {
        alert('Error')
        console.log(err)
        return []
    })
}

export const getForecastData = async (lat, lon, limit) => {
    const settledPromise = fetchWeatherData(lat, lon)
    .then((resp) => {
        const data = resp.data
        const hourlyData = []
        data.hourly.slice(0, limit).forEach(record => {
            let options = {hour: 'numeric', minute: 'numeric'}
            hourlyData.push({
                dt: new Date(record.dt * 1000).toLocaleTimeString('GMT', options),
                temp: record.temp,
                humidity: record.humidity,
                wind: record.wind_speed,
                icon: record.weather[0].icon,
                main: record.weather[0].main,
                description: record.weather[0].description
            })
        })
        const dailyData = []
        data.daily.slice(0, limit).forEach(record => {
            const date = new Date(record.dt * 1000)
            dailyData.push({
                day: date.toLocaleDateString('GMT', {weekday: 'long'}),
                dt: `${date.toLocaleDateString('GMT', {month: 'short'})}, ${date.toLocaleDateString('GMT', {day: '2-digit'})}`,
                temp: record.temp.day,
                icon: record.weather[0].icon,
            })
        })
        return {hourlyData, dailyData}
    })
    .catch((err) => {
        console.log(err)
    })
    return settledPromise
}