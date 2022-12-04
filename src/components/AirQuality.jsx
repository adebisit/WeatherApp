import { useState, useEffect } from "react"
import RadialGuage from "./shared/RadialGuage"
import { getAirQualityIndex } from "../utils/AQICalculator"
import { getAirQualityData } from '../context/WeatherActions'

function AirQuality({ geolocation }) {
    const [pollutantConcentration, setPollutantConcentration] = useState(null)
    const [aqi, setAqi] = useState(null)
    const {lat, lon} = {...geolocation}

    useEffect(() => {
        const getData = async () => {
            const components = await getAirQualityData(lat, lon)
            setPollutantConcentration(components)
        }
        if (geolocation !== null) { getData() }
    }, [])

    useEffect(() => {
        if (geolocation !== null) {
            const aqi = getAirQualityIndex(pollutantConcentration)
            setAqi(aqi);
        }
    }, [pollutantConcentration])
    
    return (
        <div>
            <RadialGuage start={0} end={500} value={aqi} title="AQI" subTitle="US-EPA"/>
            <p>{aqi}</p>
        </div>
    )
}
export default AirQuality