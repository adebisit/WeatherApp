import RadialGuage from "./shared/RadialGuage"
import { getAirQualityIndex } from "../utils/AQICalculator"

function AirQuality({ components }) {
    const aqi = getAirQualityIndex(components)
    return (
        <div>
            <RadialGuage start={0} end={500} value={aqi} title="AQI" subTitle="US-EPA"/>
            <p>{aqi}</p>
        </div>
    )
}
export default AirQuality