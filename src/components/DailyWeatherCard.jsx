import MeasurementDisplay from "./shared/MeasurementDisplay"


function DailyWeatherCard({ weatherData }) {
    const {day, dt, icon, temp} = {...weatherData}
    return (
        <div className="px-6 py-2 flex justify-between items-center rounded-xl" style={{backgroundColor: "#171642" }}>
            <div className="">
                <p className="font-semibold text-lg mb-1">{day}</p>
                <p className="font-light text-sm">{dt}</p>
            </div>
            <div className="">
                
                <div className="text-4xl">
                    <MeasurementDisplay value={temp} variable='temperature' />
                </div>
                {/* <p className="text-4xl">{temp}<sup>&#176;C</sup></p> */}
            </div>
            <div className="">
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather"/>
            </div>
        </div>
    )
}
export default DailyWeatherCard