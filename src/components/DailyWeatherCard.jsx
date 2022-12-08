import MeasurementDisplay from "./shared/MeasurementDisplay"


function DailyWeatherCard({ weatherData }) {
    const {day, dt, icon, temp} = {...weatherData}
    return (
        <div className="px-6 py-2 flex justify-between items-center rounded-xl" style={{backgroundColor: "#171642" }}>
            <div className="w-1/3">
                <p className="font-semibold text-lg mb-1">{day}</p>
                <p className="font-light text-sm">{dt}</p>
            </div>
            <div className="w-1/3">
                <div className="text-4xl text-center">
                    <MeasurementDisplay value={temp} variable='temperature' />
                </div>
            </div>
            <div className="w-1/3 flex justify-end items-center">
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather"/>
            </div>
        </div>
    )
}
export default DailyWeatherCard