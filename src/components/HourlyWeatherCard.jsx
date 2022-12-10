import MeasurementDisplay from "./shared/MeasurementDisplay"

function HourlyWeatherCard({weather, selected}) {
  return (
    <div
        className="grid gap-1 grid-cols-2 p-3 rounded-xl focus:outline-none shadow-md shadow-inner"
        style={{
            minWidth: '11rem',
            height: '80px',
            backgroundColor: selected ? '#1B86E6' : '#171642'
        }}
    >
        <div className="row-span-2 grid-cols-1">
        <img src={`/assets/weathericons/${weather.icon}.svg`} alt="weather" style={{width: '40px', height: '40px'}}/>
        </div>
        <div className="grid-cols-2 grid-rows-1">
            <p className="text-sm">{weather.dt}</p>
        </div>
        <div className="grid-cols-2 grid-rows-2">
            <p className="text-base font-bold text-xs">
                <MeasurementDisplay value={weather.temp} variable='temperature' />
            </p>
        </div>
    </div>
  )
}
export default HourlyWeatherCard