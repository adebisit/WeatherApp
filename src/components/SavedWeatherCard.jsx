import { MdClose } from "react-icons/md"
import MeasurementDisplay from "./shared/MeasurementDisplay"


function SavedWeatherCard({ state, countryCode, weatherData, removeFromSavedLocations }) {
  const { temp, icon, main } = {...weatherData}

  return (
    <div
      className="flex justify-between rounded-2xl p-4"
      style={{backgroundColor: '#171642'}}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <div className="text-left">
            <p>
              <MeasurementDisplay value={temp} variable='temperature' />
              {/* {temp}&#176; */}
            </p>
            <p className="font-thin text-sm">{main}</p>
          </div>
          <div className="text-left">
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} width={80} alt={main} />
          </div>
        </div>
        <div className="">
          <span className="font-medium text-lg">{state}, </span>
          <span className="text-sm font-light">{countryCode}</span>
        </div>
      </div>
      <div className="">
        <button className="p-1 outline-none" onClick={() => removeFromSavedLocations(state, countryCode)}>
          <MdClose size={15}/>
        </button>
      </div>
    </div>
  )
}
export default SavedWeatherCard