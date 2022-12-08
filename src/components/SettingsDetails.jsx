import { useContext } from "react"
import WeatherContext from "../context/weather/WeatherContext"
import { MdLocationOn } from "react-icons/md"
import { Link } from "react-router-dom"


function SettingsDetails() {
    const {geolocation, units} = useContext(WeatherContext)
    
    return (
        <div className="">
            <div className="flex justify-center items-center mb-3">
                <MdLocationOn size={15} className="mr-3"/>
                <p className="text-xl overflow-auto">{geolocation?.formattedAddress}</p>
            </div>
            <div className="flex justify-center">
                <p className="mr-2 text-md">Units: </p>
                <p className="text-md">{units}</p>
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