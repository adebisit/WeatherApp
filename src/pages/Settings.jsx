import { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import WeatherContext from "../context/weather/WeatherContext"
import SettingsForm from "../components/SettingsForm"
import SettingsDetails from "../components/SettingsDetails"


function Settings() {
    const {units, geolocation} = useContext(WeatherContext)

    return (<div>
        <header className="text-center pt-4 pb-6">
            <p className="text-3xl">Settings</p>
        </header>
        <main className="px-2 mt-16">
            <div className="flex justify-center my-16">
                <FaUserCircle size={100}/>
            </div>
            <div>
                <Routes>
                    <Route index element={<SettingsDetails />} />
                    <Route path="edit" element={<SettingsForm initialValues={{units, geolocation}}/>} />
                </Routes>
            </div>
        </main>
    </div>)
}
export default Settings