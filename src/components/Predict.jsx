import MeasurementDisplay from "./shared/MeasurementDisplay"


function Predict({ weatherData }) {
    const { temp, wind_speed, humidity, icon, main, description } = {...weatherData}

    return (
        <div className="p-5 rounded-2xl">
            <div>
                <p className="text-center text-4xl font-bold ">{main}</p>
                <p className="text-center text-base">{description}</p>
            </div>
            <div className="my-8">
                <img className="m-auto" src={`/assets/weathericons/${icon}.svg`} alt='temp' style={{height: '200px'}}/>
            </div>
            <div className="flex w-5/6 mx-auto justify-between">
                <div className="text-center">
                    <p className="font-light">Temp</p>
                    <p className="font-bold">
                        <MeasurementDisplay value={temp} variable='temperature' />
                    </p>
                </div>
                <div className="text-center">
                    <p className="font-light">Wind</p>
                    <p className="font-bold">
                        <MeasurementDisplay value={wind_speed} variable='windSpeed' />
                    </p>
                </div>
                <div className="text-center">
                    <p className="font-light">Humidity</p>
                    <p className="font-bold">{humidity}%</p>
                </div>
            </div>
        </div>
    )
}
export default Predict