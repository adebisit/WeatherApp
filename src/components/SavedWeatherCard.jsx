import { useState } from "react"
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
import { MdClose } from "react-icons/md"


function SavedWeatherCard({ state, countryCode, weatherData, unpinWeatherSearchResult }) {
  const { temp, icon, main } = {...weatherData}

  return (
    <div
      className="flex justify-between rounded-2xl p-4"
      style={{backgroundColor: '#171642'}}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <div className="text-left">
            <p>{temp}&#176;</p>
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
        <button className="p-1 outline-none" onClick={() => unpinWeatherSearchResult({state, countryCode})}>
          <MdClose size={15}/>
        </button>
      </div>
    </div>
  )
}
export default SavedWeatherCard