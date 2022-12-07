import MeasurementDisplay from "./shared/MeasurementDisplay"

function HourlyWeatherCard({weather, selected}) {
  return (
    <div
        className="grid w-40 gap-1 grid-cols-2 p-3 rounded-xl focus:outline-none shadow-md shadow-inner"
        style={{backgroundColor: selected ? '#1B86E6' : '#171642'}}
    >
        <div className="row-span-2 grid-cols-1">
            <img className="m-auto" src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt='temp'/>
        </div>
        <div className="grid-cols-2 grid-rows-1">
            <p className="text-sm">{weather.dt}</p>
        </div>
        <div className="grid-cols-2 grid-rows-2">
            <p className="text-base font-bold text-xs">
                {/* {weather.temp}&#176; */}
                <MeasurementDisplay value={weather.temp} variable='temperature' />
            </p>
        </div>
    </div>
  )
}
export default HourlyWeatherCard