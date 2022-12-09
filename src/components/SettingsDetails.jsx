import { useContext } from "react"
import WeatherContext from "../context/weather/WeatherContext"
import { MdLocationOn } from "react-icons/md"
import { Link } from "react-router-dom"


function SettingsDetails() {
    const {geolocation, units} = useContext(WeatherContext)
    
    const getUnitChoice = () => {
        switch(units) {
            case 'standard': return ["Standard", "Kelvin, Meter/Second"]
            case 'metric': return ["Metric", "°C, Meter/Second"]
            case 'imperial': return ["Imperial", "°F, Miles/Second"]
            default: return [units, ""]
        }
    }

    const [variable, unitForamt] = getUnitChoice()

    return (
        <div className="">
            <div className="flex justify-center items-center mb-3">
                <MdLocationOn size={18} className="mr-2"/>
                <p className="text-xl overflow-auto text-center">{geolocation?.formattedAddress}</p>
            </div>
            <div className="text-center">
                <p>
                    <span className="text-md font-medium">{variable}</span>
                    <span className="ml-1 text-sm font-light">({unitForamt})</span>
                </p>
            </div>
            <div className="mt-3 text-center">
                <Link to="edit" className="underline">
                    Edit
                </Link>
            </div>
        </div>
    )
}
export default SettingsDetails