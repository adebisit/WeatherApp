import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import LocationSearchBox from "./shared/LocationSearchBox"
import { TbEdit } from 'react-icons/tb'
import WeatherContext from "../context/weather/WeatherContext"
import { useState } from "react"


function SettingsForm({ initialValues }) {
    const navigate = useNavigate()
    const {dispatch} = useContext(WeatherContext)
    const [geolocation, setGeolocation] = useState(initialValues.geolocation)
    const [units, setUnits] = useState(initialValues.units)

    const updateSettings = (e) => {
        e.preventDefault()
        // const {lat, lon, formattedAddress} = {...geolocation}
        console.log(geolocation)
        dispatch({
            type: 'UPDATE_SETTINGS',
            payload: {
                geolocation,
                units
            }
        })
        localStorage.setItem("geolocation", JSON.stringify(geolocation))
        localStorage.setItem("units", units)
        navigate('/settings')
    }

    const locationSelected = (location) => {
        setGeolocation(location)
    }

    return (
        <div className="">
            <form onSubmit={updateSettings}>
                <div className="">
                    <LocationSearchBox exact initialInput={initialValues.geolocation} locationSelected={locationSelected}/>
                </div>
                <div className="mt-6">
                    <select
                        value={units}
                        className="text-white p-2 pr-4 rounded-md text-sm border-solid border-white border"
                        style={{backgroundColor: "transparent"}}
                        onChange={(e) => setUnits(e.target.value)}
                    >
                        <option value="standard">Standard (K, meter/second)</option>
                        <option value="metric">Metric (&#8451;, meter/second)</option>
                        <option value="imperial">Imperial (&#8457;, miles/second)</option>
                    </select>
                </div>
                <div className="flex justify-center mt-8">
                    <button className="border border-solid px-8 py-1 bg-white text-black font-semibold rounded-md cursor-pointer" type="Submit">Save</button>
                </div>
            </form>
        </div>
    )
}
export default SettingsForm