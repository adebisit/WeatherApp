import { useContext } from "react"
import { Routes, Route, Link } from "react-router-dom"
import WeatherContext from "../context/weather/WeatherContext"
import { FaUserCircle } from "react-icons/fa"
import SettingsForm from "../components/SettingsForm"


function Settings() {
    const {units, geolocation} = useContext(WeatherContext)

    return (<div>
        <Link to="edit">Edit</Link>
        <header className="text-center pt-4 pb-6">
            <p className="text-3xl">Settings</p>
        </header>
        <main className="px-2 mt-8">
            <div className="flex justify-center my-16">
                <FaUserCircle size={100}/>
            </div>
            <div>
                <Routes>
                    <Route path="edit" element={<SettingsForm initialValues={{units, geolocation}}/>} />
                </Routes>
                <div className="flex">
                    <p>Location</p>
                    <p></p>
                </div>
            </div>
        </main>
    </div>)
}
export default Settings