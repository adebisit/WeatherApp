import { useRef, useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { MdOutlineLocationOn } from "react-icons/md"
import { reverseGeoding } from "../../context/GeolocationActions"


function LocationSearchBox({ locationSelected }) {
    const [keyword, setKeyword] = useState()
    const autoCompleteRef = useRef(null)
    const inputRef = useRef()
    const options = {
        fields: ["name", "geometry", "address_components"],
        // types: ["(cities)"]
    }

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            const components = place.address_components
            let countryCode = ""
            let state = "null"
            for (var component of components) {
                const {long_name, short_name, types} = {...component}
                if (types !== undefined && types[0] === 'country') {
                    countryCode = short_name
                }
                if (types !== undefined && types[0] === "administrative_area_level_1") {
                    state = long_name
                }
            }
            setKeyword(place.name)
            const lat = place.geometry.location.lat()
            const lon = place.geometry.location.lng()
            locationSelected({lat, lon, state, countryCode})
           });

    }, [])

    const getCurrentGeolocation = async () => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const data = await reverseGeoding({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                })
                if (data === null) {
                    alert('Error Locating your position')
                } else {
                    const address = data.results[0].formatted_address
                    setKeyword(address)
                    locationSelected(address)
                }
            },
            () => { alert("Couldn't determine location")}
        )
    }

    return (
        <div className="flex w-full justify-between">
            <div className="w-full relative">
                <div className="absolute inset-y-0 w-12 flex items-center justify-center">
                    <FaSearch className="text-lg"/>
                </div>
                <input
                    id="keyword"
                    ref={inputRef}
                    value={keyword}
                    type="text"
                    className="w-full rounded-lg pl-12 py-3"
                    style={{backgroundColor: "#171642"}}
                    onChange={e => setKeyword(e.target.value)}
                />  
            </div>
            <button
                    className="px-4 ml-3 rounded-lg"
                    style={{backgroundColor: "#171642"}}
                    onClick={getCurrentGeolocation}
            >
                    <MdOutlineLocationOn color="white"/>
            </button>
        </div>
    )
}
export default LocationSearchBox