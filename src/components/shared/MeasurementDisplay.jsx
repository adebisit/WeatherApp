import { useContext } from "react"
import WeatherContext from "../../context/weather/WeatherContext"


function MeasurementDisplay({ value, variable }) {
    const {units} = useContext(WeatherContext)
    const getUnit = () => {
        let output = ""
        if (variable === "windSpeed") {
            output = units === 'imperial' ? 'miles/s' : 'meter/s'
        }
        if (variable === "temperature") {
            switch(units) {
                case 'standard': output = (<sup>K</sup>); break;
                case "metric": output = (<sup>&#8451;</sup>);  break;
                case "imperial": output = (<sup>&#8457;</sup>);  break;
                default: output = (<sup>NaN</sup>)
            }
        }
        return output
    }
    return (
        <span style={{ fontSize: 'inherit' }}>
            {value}{(variable === 'windSpeed' || units === 'standard') && ' '}
            { getUnit() }
        </span>
    )
}
export default MeasurementDisplay